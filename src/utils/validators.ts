const isNotEmpty = (value: string) => {
    return value.trim() !== ''
}

const isPastDate = (value: string) => {
    const inputDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate < today;
  };

export { isNotEmpty, isPastDate,  }