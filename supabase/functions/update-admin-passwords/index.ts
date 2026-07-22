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

    const adminEmails = ["awc@thexecutionclub.com", "info@nmsg.biz"];
    const newPassword = "!XC4thewin!";
    const results = [];

    const { data: existingUsers } = await supabase.auth.admin.listUsers();

    for (const email of adminEmails) {
      const user = existingUsers?.users?.find((u) => u.email === email);
      if (!user) {
        results.push({ email, status: "not_found" });
        continue;
      }

      const { error } = await supabase.auth.admin.updateUserById(user.id, {
        password: newPassword,
      });

      if (error) {
        results.push({ email, status: "error", error: error.message });
      } else {
        results.push({ email, status: "password_updated" });
      }
    }

    return new Response(JSON.stringify({ success: true, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
