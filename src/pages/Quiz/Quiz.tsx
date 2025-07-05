import { useState, useEffect, useRef } from "react";
import { Card, Button, Radio, Checkbox, Steps, Typography, Progress, Result } from "antd";
import { updateData } from "../../services/apiService";
import { useAppSelector } from "../../app/hooks";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../services/apiService";

async function getDocIdByUid(uid: string) {
  const q = query(collection(db, "users"), where("email", "==", uid));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].id; // <-- это docId Firestore
  }
  return null;
}

const { Title, Paragraph } = Typography;

const questions = [
  {
    label: "How would you describe your hair’s natural texture when air-dried?",
    name: "q1",
    options: [
      { label: "Straight", value: "1" },
      { label: "Wavy", value: "2" },
      { label: "Curly", value: "3" },
      { label: "Coily or Kinky", value: "4" },
    ],
    required: true,
    type: "radio",
  },
  {
    label: "How does your hair behave in humid weather?",
    name: "q2",
    options: [
      { label: "Stays smooth", value: "1" },
      { label: "Gets a bit frizzy", value: "2" },
      { label: "Becomes very frizzy or puffs up", value: "3" },
      { label: "Shrinks or coils tightly", value: "4" },
    ],
    required: true,
    type: "radio",
  },
  {
    label: "How long does it take your hair to dry naturally?",
    name: "q3",
    options: [
      { label: "Less than 1 hour", value: "low" },
      { label: "1–2 hours", value: "medium" },
      { label: "3 or more hours", value: "high" },
    ],
    required: true,
    type: "radio",
  },
  {
    label: "When you run your fingers through clean, dry hair, how does it feel?",
    name: "q4",
    options: [
      { label: "Very smooth and slippery", value: "low" },
      { label: "A little rough or dry", value: "medium" },
      { label: "Very dry, tangly, or coarse", value: "high" },
    ],
    required: true,
    type: "radio",
  },
  {
    label: "How does your hair absorb water in the shower?",
    name: "q5",
    options: [
      { label: "Water rolls off", value: "low" },
      { label: "Absorbs slowly", value: "medium" },
      { label: "Instantly soaks it up", value: "high" },
    ],
    required: true,
    type: "radio",
  },
  {
    label: "How often does your scalp get oily after washing?",
    name: "q6",
    options: [
      { label: "Same day", value: "oily" },
      { label: "Within 2–3 days", value: "balanced" },
      { label: "Rarely or never", value: "dry" },
    ],
    required: true,
    type: "radio",
  },
  {
    label: "How well does your hair hold a curl or style?",
    name: "q7",
    options: [
      { label: "Doesn’t hold at all", value: "none" },
      { label: "Holds for a few hours", value: "some" },
      { label: "Holds for days", value: "long" },
    ],
    required: true,
    type: "radio",
  },
  {
    label: "Which of the following issues do you experience most often?",
    name: "q8",
    options: [
      { label: "Frizz", value: "frizz" },
      { label: "Flat roots", value: "flat" },
      { label: "Dryness or breakage", value: "dry" },
      { label: "Greasiness", value: "greasy" },
      { label: "Shrinkage or tight coils", value: "shrinkage" },
    ],
    required: false,
    type: "checkbox",
  },
];

const curlMap = {
  1: "Type 1 (Straight)",
  2: "Type 2 (Wavy)",
  3: "Type 3 (Curly)",
  4: "Type 4 (Coily/Kinky)",
};

const porosityMap = {
  low: "Low Porosity",
  medium: "Medium Porosity",
  high: "High Porosity",
};

const scalpMap = {
  oily: "Oily Scalp",
  balanced: "Balanced Scalp",
  dry: "Dry Scalp",
};

const concernMap = {
  frizz: "Frizz",
  flat: "Flat Roots",
  dry: "Dryness/Breakage",
  greasy: "Greasiness",
  shrinkage: "Shrinkage",
};

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showResult, setShowResult] = useState(false);

  const userEmail = useAppSelector(state => state.user.data?.email);

  const hasSaved = useRef(false);

  const handleChange = (name: string, value: any) => {
    setAnswers(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (
      questions[current].required &&
      (answers[questions[current].name] === undefined ||
        answers[questions[current].name] === "" ||
        (Array.isArray(answers[questions[current].name]) && answers[questions[current].name].length === 0))
    ) {
      return;
    }
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  // Сохраняем тип волос в Firestore по токену при показе результата (только один раз)
  useEffect(() => {
    async function saveType() {
      if (showResult && userEmail && !hasSaved.current) {
        const curlType = answers.q1; // "1" | "2" | "3" | "4"
        if (curlType) {
          const docId = await getDocIdByUid(userEmail); // userEmail = UID
          if (docId) {
            updateData(docId, "users", { type: curlType })
              .catch(e => console.error("Ошибка сохранения типа волос:", e));
            hasSaved.current = true;
            console.log("Сохранён тип волос для docId:", docId);
          } else {
            console.error("Не найден docId для UID:", userEmail);
          }
        }
      }
    }
    saveType();
  }, [showResult, userEmail, answers.q1]);

  // Результаты
  let resultBlock = null;
  if (showResult) {
    const curlResult = curlMap[answers.q1 as keyof typeof curlMap];
    let score = { low: 0, medium: 0, high: 0 };
    ["q3", "q4", "q5"].forEach(q => {
      const val = answers[q] as "low" | "medium" | "high" | undefined;
      if (val && score.hasOwnProperty(val)) {
        score[val]++;
      }
    });
    let porosity: keyof typeof porosityMap = "medium";
    if (score.high >= 2) porosity = "high";
    else if (score.low >= 2) porosity = "low";

    const scalpResult = scalpMap[answers.q6 as keyof typeof scalpMap];
    const concerns = answers.q8 || [];
    const concernText =
      concerns.length > 0
        ? concerns.map((c: keyof typeof concernMap) => concernMap[c]).join(", ")
        : "None";

    resultBlock = (
      <Result
        status="success"
        title="Your Hair Profile"
        subTitle="Use these results to choose the right products and routine for your hair."
        extra={
          <div style={{ textAlign: "left", margin: "0 auto", maxWidth: 400 }}>
            <p><strong>Curl Type:</strong> {curlResult}</p>
            <p><strong>Porosity:</strong> {porosityMap[porosity]}</p>
            <p><strong>Scalp Type:</strong> {scalpResult}</p>
            <p><strong>Common Concerns:</strong> {concernText}</p>
          </div>
        }
      />
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 24 }}>
      <Card>
        <Title level={2} style={{ textAlign: "center" }}>Discover Your Hair Type</Title>
        <Steps
          current={current}
          size="small"
          items={questions.map((_q, idx) => ({
            title: `Q${idx + 1}`,
          }))}
          style={{ marginBottom: 32 }}
        />
        <Progress
          percent={Math.round(((current + (showResult ? 1 : 0)) / questions.length) * 100)}
          showInfo={false}
          style={{ marginBottom: 24 }}
        />

        {!showResult ? (
          <>
            <Paragraph strong style={{ fontSize: 18, marginBottom: 16 }}>
              {questions[current].label}
            </Paragraph>
            {questions[current].type === "radio" && (
              <Radio.Group
                onChange={e => handleChange(questions[current].name, e.target.value)}
                value={answers[questions[current].name]}
                style={{ display: "flex", flexDirection: "row", gap: 24, marginBottom: 24 }}
              >
                {questions[current].options.map(opt => (
                  <Radio key={opt.value} value={opt.value} style={{ minWidth: 120 }}>
                    {opt.label}
                  </Radio>
                ))}
              </Radio.Group>
            )}
            {questions[current].type === "checkbox" && (
              <Checkbox.Group
                options={questions[current].options}
                value={answers[questions[current].name] || []}
                onChange={vals => handleChange(questions[current].name, vals)}
                style={{ display: "flex", flexDirection: "row", gap: 24, marginBottom: 24 }}
              />
            )}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
              <Button onClick={handlePrev} disabled={current === 0}>
                Previous
              </Button>
              <Button
                type="primary"
                onClick={handleNext}
                disabled={
                  questions[current].required &&
                  (answers[questions[current].name] === undefined ||
                    answers[questions[current].name] === "" ||
                    (Array.isArray(answers[questions[current].name]) && answers[questions[current].name].length === 0))
                }
              >
                {current === questions.length - 1 ? "Show Results" : "Next"}
              </Button>
            </div>
          </>
        ) : (
          resultBlock
        )}
      </Card>
    </div>
  );
}