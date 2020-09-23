const refactorImportSubTasks = (importSubTasks: any) => {
  const prevSubTasks = importSubTasks.criteria.filter(
    (item: { type: string }) => item.type === 'subtask' || item.type === 'penalty'
  );
  return prevSubTasks.map((item: { max: number; text: any }, index: any) => {
    return {
      score: item.max,
      category: item.max > 0 ? 'Basic' : 'Fine',
      description: '',
      id: index,
      mentorCheck: false,
      title: item.text,
    };
  });
};

export default refactorImportSubTasks;
