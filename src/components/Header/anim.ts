export const menuSlide = {
  initial: {
    x: "100%",
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  },
  enter: {
    x: "0%",
    borderTopLeftRadius: "0%",
    borderBottomLeftRadius: "0%",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    x: "100%",
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

export const linkSlide = {
  initial: {
    x: "80px",
  },
  enter: (i: number) => ({
    x: "0px",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
  }),
  exit: (i: number) => ({
    x: "80px",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
  }),
};
