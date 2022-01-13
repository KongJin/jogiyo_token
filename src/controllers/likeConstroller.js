import User from "../../models/User";
import { verify } from "../JWT/verify";

export const kok = async (req, res) => {
  const { someoneID } = req.body;
  try {
    const email = verify(req);

    const user = await User.findOne({ email }); //내정보

    user.iLike.push(someoneID); //내정보에 내가 좋아하는 사람에 누군가를 추가
    user.save();

    const someone = await User.findOne({ _id: someoneID });

    someone.likeMe.push(someone._id);
    someone.save();
    res.json({ message: "ok" });
  } catch {
    res.json({ message: "false" });
  }
};

export const LikeList = async (req, res) => {
  const email = verify(req);

  try {
    const user = await User.findOne({ email }).populate("likeMe", "iLike"); //내정보
    res.json({ message: "ok", likeMe: user.likeMe, iLike: user.iLike });
  } catch {
    res.json({ message: "false" });
  }
};
