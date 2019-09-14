export const questionOptions = [
  'What if',
  'Why',
  'How',
];

export function getInitialQuestionObject() {
  return questionOptions.reduce(
    (accumulator, questionOption) => {
      accumulator[questionOption] = false;
      return accumulator;
    },
    {},
  );
}

export function getQuestionArray(questionObject) {
  return Object
    .keys(questionObject)
    .filter(questionOption => questionObject[questionOption]);
}
