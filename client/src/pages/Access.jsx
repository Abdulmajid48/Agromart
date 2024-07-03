import Signpage from "../components/Signpage";
// -------------- Sign up page ---------------------
function Signup() {
  return (
    <div>
      <Signpage
        sign={"Sign up"}
        display={true}
        btn={"Sign up"}
        google={"Sign Up with Google"}
        account={
          <span>
            Already have an account?
            <span className="text-[#C76001]"> Sign In</span>
          </span>
        }
      />
    </div>
  );
}

// ------------ Sign in Page --------------
function Signin() {
  return (
    <div>
      <Signpage
        sign={"Sign In"}
        display={false}
        btn={"Sign In"}
        google={"Sign In with Google"}
        account={
          <span>
            Don’t have an account?
            <span className="text-[#C76001]"> Sign up</span>
          </span>
        }
      />
    </div>
  );
}

export { Signup, Signin };
