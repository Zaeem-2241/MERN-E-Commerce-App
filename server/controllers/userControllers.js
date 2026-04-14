export const getUserProfile = (req, res) => {
    // console.log("reqbody", req.body);
    
      res.status(200).json(req.user)
};
