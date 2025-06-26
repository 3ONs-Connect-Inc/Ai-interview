deep linking after login


Then in your sign-in page, access it like this:


const location = useLocation();
const from = (location.state as { from?: string })?.from || "/";
Update your navigate logic to:


navigate(roleRoutes[userData.role] || from, { replace: true });




