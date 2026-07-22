import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const targetEmail = "info@nmsg.biz";
    const password = "!XC4thewin!";
    const results: any[] = [];

    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    let user = existingUsers?.users?.find((u) => u.email === targetEmail);
    let userId: string;

    if (user) {
      userId = user.id;
      const { error } = await supabase.auth.admin.updateUserById(userId, { password });
      results.push({ email: targetEmail, status: "password_updated", error: error?.message });
    } else {
      const { data, error } = await supabase.auth.admin.createUser({
        email: targetEmail,
        password,
        email_confirm: true,
      });
      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      userId = data.user.id;
      results.push({ email: targetEmail, status: "created", userId });
    }

    const { error: roleError } = await supabase
      .from("user_roles")
      .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });

    if (roleError) results.push({ status: "role_error", error: roleError.message });
    else results.push({ status: "role_assigned" });

    // Also ensure awc@thexecutionclub.com password is correct
    const awcUser = existingUsers?.users?.find((u) => u.email === "awc@thexecutionclub.com");
    if (awcUser) {
      const { error } = await supabase.auth.admin.updateUserById(awcUser.id, { password });
      results.push({ email: "awc@thexecutionclub.com", status: "password_updated", error: error?.message });
      await supabase.from("user_roles").upsert({ user_id: awcUser.id, role: "admin" }, { onConflict: "user_id,role" });
    }

    // Remove the unwanted wayne@nmsg.biz account if present
    const wayneUser = existingUsers?.users?.find((u) => u.email === "wayne@nmsg.biz");
    if (wayneUser) {
      await supabase.from("user_roles").delete().eq("user_id", wayneUser.id);
      const { error } = await supabase.auth.admin.deleteUser(wayneUser.id);
      results.push({ email: "wayne@nmsg.biz", status: "deleted", error: error?.message });
    }

    return new Response(JSON.stringify({ success: true, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
