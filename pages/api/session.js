import withSession from "plugins/next-session";

const ApiSession = async (req, res) => {
  let user = req.session.get("user");
  // console.log(user);
  return user ? res.json({ loggedIn: true, ...user }) : res.json({ loggedIn: false });
};

export default withSession(ApiSession);
