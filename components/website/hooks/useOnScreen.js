/**
 * useScroll React custom hook
 * Usage:
 *  Ref for the element that we want to detect whether on screen
 * 
    const ref = useRef();

    Call the hook passing in ref and root margin
    In this case it would only be considered onScreen if more ...
    ... than 300px of element is visible.

    const onScreen = useOnScreen(ref, '-300px');
 */
import {useState, useEffect } from "react";

export default function useOnScreen(ref, rootMargin = '0px') {
    // State and setter for storing whether element is visible
    const [isIntersecting, setIntersecting] = useState(false);
  
    useEffect(() => {
      if(ref){
        const observer = new IntersectionObserver(
          ([entry]) => {
            // Update our state when observer callback fires
            setIntersecting(entry.isIntersecting);
          },
          {
            rootMargin
          }
        );
        if (ref.current) {
          observer.observe(ref.current);
        }
        return () => {
          // console.log("in on screen",ref.current)
          observer.unobserve(ref.current);
        };
      }
    }, [isIntersecting]); // Empty array ensures that effect is only run on mount and unmount
  
    return isIntersecting;
  }