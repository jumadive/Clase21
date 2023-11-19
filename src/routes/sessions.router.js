import { Router } from "express";
// import { usersManager } from "../managers/usersManager.js";
// import { hashData, compareData } from "../utils.js";
import passport from "passport";
const router = Router();

router.post(
  "/signup",
  passport.authenticate("signup", {
    successRedirect: "/profile",
    failureRedirect: "/error"
  })
)

router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/profile",
    failureRedirect: "/error"
  })
)

//github

router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
)

router.get("/callback", passport.authenticate("github"), (req, res) => {
  res.send("Probando")
})

router.get("/signout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login")
  })
})

// router.post("/restaurar", async (req, res) => {
//   const { email, password } = req.body
//   try {
//     const user = await usersManager.findByEmail(email)
//     if (!user) {
//       return res.redirect("/")
//     }
//     const hashedPassword = await hashData(password)
//     user.password = hashedPassword
//     await user.save()
//     res.status(200).json({ message: "Password updated" })
//   } catch (error) {
//     res.status(500).json({ error })
//   }
// })
export default router