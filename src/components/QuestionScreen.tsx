import { questions } from "@/data/questions";

interface Props {
  questionIndex: number;
  onAnswer: (questionId: number, score: number) => void;
}

const QuestionScreen = ({ questionIndex, onAnswer }: Props) => {
  const question = questions[questionIndex];
  const total = questions.length;

  return (
    <div className="min-h-screen flex flex-col px-6 py-8">
      {/* Progress */}
      <div className="max-w-2xl mx-auto w-full space-y-2">
        <div className="flex justify-between items-center text-[9px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em" }}>
          <span className="text-primary">
            {question.section === 1 ? "SECTION 1 · FOUNDER INTELLIGENCE" : "SECTION 2 · AI SECURITY & GOVERNANCE"}
          </span>
          <span className="text-muted-foreground">Question {questionIndex + 1} of {total}</span>
        </div>
        <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${((questionIndex + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-2xl w-full space-y-8">
          <p className="text-muted-foreground text-[9px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em" }}>
            Q{question.id} · {question.domain}
          </p>
          <h2 className="text-2xl md:text-3xl text-foreground leading-snug" style={{ fontFamily: "var(--font-heading)", fontWeight: 900, textTransform: "none", letterSpacing: "-0.01em" }}>
            {question.text}
          </h2>
          <div className="space-y-3">
            {question.answers.map((answer, i) => (
              <button
                key={i}
                onClick={() => onAnswer(question.id, answer.score)}
                className="w-full text-left px-6 py-4 rounded-lg border border-border bg-card text-card-foreground hover:border-primary hover:bg-secondary transition-all text-base md:text-lg"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <span className="text-primary font-bold mr-2" style={{ fontFamily: "var(--font-mono)" }}>{answer.score}</span>
                {answer.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionScreen;
