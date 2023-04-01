import { useSelector } from "react-redux";

const Calender = () => {
  const loggedInEmail = useSelector((state: any) => state.user.value.email)
  return (
    <div className="container justify-content-end">
      <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Australia%2FAdelaide&src=bGl2aWEuZ3UwNzE5QGdtYWlsLmNvbQ&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4uYXVzdHJhbGlhbiNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%237986CB&color=%2333B679&color=%230B8043"  width="100%" height="365px" frameBorder="0" scrolling="no" title={loggedInEmail} ></iframe>
    </div>
  );
}

export default Calender