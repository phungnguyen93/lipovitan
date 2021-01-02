import { withIronSession } from "next-iron-session";
import ApiCall from "modules/ApiCall";
import CONFIG from "web.config";

export const SessionConfig = {
    cookieName: CONFIG.IRON_SESSION_NAME,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production" ? true : false,
    },
    password: CONFIG.IRON_SESSION_SECRET,
};

export default function withSession(handler) {
    return withIronSession(handler, SessionConfig);
}

const checkLoginSession = async ({ req, res, then }) => {
    let user = req.session.get("user");

    if (!user) {
        res.setHeader("location", CONFIG.getBasePath() + "/admin/login");
        res.statusCode = 302;
        res.end();
        return { props: {} };
    } else {
        // check token expired
        let checkLogin = await ApiCall({
            path: "/api/v1/auth/users/profiles",
            token: user.token,
        });

        if (!checkLogin.status) {
            res.setHeader("location", CONFIG.getBasePath() + "/admin/login");
            res.statusCode = 302;
            res.end();
            return { props: {} };
        }
    }

    if (!user) {
        return { props: { redirect: CONFIG.getBasePath() + "/login" } };
    } else {
        return { props: { user } };
    }
};

export const getServerSideProps = withIronSession(checkLoginSession, SessionConfig);
