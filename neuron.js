function neuron(data) {
  const result = {};

  for (const item of data) {
    const [category, response] = item.split(' - Response: ');
    const [categoryType, content] = category.split(': ');

    const categoryKey = categoryType.toLowerCase();
    const contentKey = content.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '_');

    if (!result[categoryKey]) {
      result[categoryKey] = {};
    }

    let propertyName;
    if (categoryKey === 'questions') {
      propertyName = 'question';
    } else if (categoryKey === 'orders') {
      propertyName = 'order';
    } else if (categoryKey === 'affirmations') {
      propertyName = 'affirmation';
    } else {
      propertyName = categoryKey.slice(0, -1);
    }

    if (!result[categoryKey][contentKey]) {
      result[categoryKey][contentKey] = {
        [propertyName]: content,
        responses: []
      };
    }

    result[categoryKey][contentKey].responses.push(response);
  }

  return result;
}