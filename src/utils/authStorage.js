function setUserData({ userName, token, userId }) {
    localStorage.setItem("userName", JSON.stringify(userName));
    localStorage.setItem("userId", JSON.stringify(userId))
    localStorage.setItem("token", JSON.stringify(token));
  }
  
  function getUserData() {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId");
    return { token, userName, userId };
  }
  
  function clearUserData() {
    localStorage.clear();
  }
  
  export { setUserData, getUserData, clearUserData };