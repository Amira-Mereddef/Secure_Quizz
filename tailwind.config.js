import React, { useState, useEffect } from 'react';

export default function QuizCreator() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: '',
      points: 5,
      required: true,
      oneAnswerOnly: false,
      choices: [
        { id: 1, text: "" },
        { id: 2, text: "" },
        { id: 3, text: "" },
      ]
    }
  ]);
  const [randomizeOrder, setRandomizeOrder] = useState(false);

  const addQuestion = () => {
    const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
    setQuestions([...questions, {
      id: newId,
      text: '',
      points: 1,
      required: false,
      oneAnswerOnly: false,
      choices: []
    }]);
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(questions.map(q =>
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const addChoice = (questionId) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newChoiceId = q.choices.length > 0 ? Math.max(...q.choices.map(c => c.id)) + 1 : 1;
        return {
          ...q,
          choices: [...q.choices, { id: newChoiceId, text: '' }]
        };
      }
      return q;
    }));
  };

  const updateChoice = (questionId, choiceId, text) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          choices: q.choices.map(c =>
            c.id === choiceId ? { ...c, text } : c
          )
        };
      }
      return q;
    }));
  };

  const deleteChoice = (questionId, choiceId) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          choices: q.choices.filter(c => c.id !== choiceId)
        };
      }
      return q;
    }));
  };

  const handleCreateQuiz = () => {
    console.log("Creating quiz with:", { questions, randomizeOrder });
  };

  const ToggleSwitch = ({ isOn, handleToggle, label }) => (
    <div className="flex items-center space-x-2">
      <div
        className={`w-9 h-5 flex items-center bg-${isOn ? '[#3F8CAA]' : 'gray-300'} rounded-full p-1 cursor-pointer`}
        onClick={handleToggle}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${isOn ? 'translate-x-4' : ''}`}
        />
      </div>
      <span className={`text-sm ${isOn ? 'text-[#3F8CAA]' : 'text-gray-600'}`}>{label}</span>
    </div>
  );

  const CustomDeleteIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="#3F8CAA"/>
    </svg>
  );

  return (
    <div className="font-sans max-w-xl mx-auto bg-white shadow-md border border-gray-200 rounded-lg">
      <h2 className="text-[#3F8CAA] text-lg text-center font-medium py-4 border-b border-gray-200">Quiz Q/A</h2>

      <div className="p-4">
        {questions.map((question) => (
          <div key={question.id} className="mb-4 p-4 border border-gray-300 rounded-md">
            <label className="text-sm text-[#3F8CAA] block mb-1">Question</label>
            <div className="relative mb-4">
              <input
                type="text"
                className="w-full border border-[#3F8CAA] rounded px-3 py-2 text-sm text-[#30393D] focus:outline-none"
                value={question.text}
                onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
                placeholder="Enter a question"
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#3F8CAA]"
                onClick={() => deleteQuestion(question.id)}
              >
                <CustomDeleteIcon />
              </button>
            </div>

            <label className="text-sm text-[#3F8CAA] block mb-1">Points</label>
            <input
              type="number"
              className="w-24 border border-[#3F8CAA] rounded px-3 py-2 text-sm text-[#30393D] mb-2"
              value={question.points}
              onChange={(e) => updateQuestion(question.id, 'points', e.target.value)}
            />

            <label className="text-sm text-[#3F8CAA] block mt-2 mb-1">Choices</label>
            {question.choices.map(choice => (
              <div key={choice.id} className="relative mb-2">
                <input
                  type="text"
                  className="w-full border border-[#3F8CAA] rounded px-3 py-2 text-sm text-[#30393D]"
                  value={choice.text}
                  onChange={(e) => updateChoice(question.id, choice.id, e.target.value)}
                  placeholder="Enter a choice"
                />
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#3F8CAA]"
                  onClick={() => deleteChoice(question.id, choice.id)}
                >
                  <CustomDeleteIcon />
                </button>
              </div>
            ))}
            <button
              className="w-full border border-[#3F8CAA] bg-[#e6f0f3] text-[#3F8CAA] rounded px-3 py-2 text-sm font-medium mt-2"
              onClick={() => addChoice(question.id)}
            >+ Add Choice</button>
          </div>
        ))}

        <div className="flex justify-start items-center border-t border-gray-200 pt-4 mb-4">
          <ToggleSwitch
            isOn={randomizeOrder}
            handleToggle={() => setRandomizeOrder(!randomizeOrder)}
            label="Randomize Order"
          />
        </div>

        <button
          className="w-full border border-[#3F8CAA] text-[#3F8CAA] rounded px-4 py-2 text-sm font-medium mb-4"
          onClick={addQuestion}
        >+ Add Question</button>

        <button
          className="block mx-auto border border-[#3F8CAA] text-[#3F8CAA] rounded px-6 py-2 text-sm font-semibold"
          onClick={handleCreateQuiz}
        >Create Quiz</button>
      </div>
    </div>
  );
}
