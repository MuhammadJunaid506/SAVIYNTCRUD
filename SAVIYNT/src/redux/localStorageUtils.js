export const saveListToLocalStorage = (updatedList) => {
    try {
      localStorage.setItem('itemList', JSON.stringify(updatedList));
    } catch (error) {
      console.error('Error saving data to local storage:', error);
    }
  };
  
  export const getListLocalStorage = () => {
    const savedListJSON = localStorage.getItem('itemList');
    return savedListJSON ? JSON.parse(savedListJSON) : [];
  };
  