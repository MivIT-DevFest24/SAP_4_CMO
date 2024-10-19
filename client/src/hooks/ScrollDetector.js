export const useScrollDetector = (setIsScrolled) => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
  
      // Check if the user has scrolled down more than 50px
      if (scrollTop > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
  
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
  
    // Remove scroll event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  };
  