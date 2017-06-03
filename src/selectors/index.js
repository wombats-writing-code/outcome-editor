

export const keywordSearch = (haystack, needle) => {
  let parts = needle.split(' ');
  let partQ = '';
  for (let i=0; i<parts.length; i++) {
    if (i==0) {
      partQ = '(?=.*\\b' + parts[i] + ')';
    } else {
      partQ = partQ + '(?=.*\\b' +  parts[i] + ')';
    }
  }

  let re = new RegExp(partQ, 'gi');
  let matching = re.test(haystack);

  // console.log('matching', haystack, needle)

  return matching;
}

export const parentTypeSelector = state => {
  if (!state.mapping) return null;

  // console.log('state.mapping', state.mapping)
  let idx = state.mapping.currentCollection.hierarchy.indexOf(state.editor.editingEntityType)

  return state.mapping.currentCollection.hierarchy[idx-1];
}

export const childTypeSelector = state => {
  if (!state.mapping) return null;

  // console.log('state.mapping', state.mapping)
  let idx = state.mapping.currentCollection.hierarchy.indexOf(state.editor.editingEntityType)

  return state.mapping.currentCollection.hierarchy[idx+1];
}
