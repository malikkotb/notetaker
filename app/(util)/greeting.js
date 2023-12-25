export default function getGreeting() {
    const currentTime = new Date().getHours();
  
    if (currentTime >= 5 && currentTime < 12) {
      return "morning, ";
    } else if (currentTime >= 12 && currentTime < 18) {
      return "afternoon, ";
    } else {
      return "evening, ";
    }
  }
  