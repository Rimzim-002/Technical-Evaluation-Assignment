import studentService from "../service/studentService.js";
import apiResponse from "../utils/apiResponse.js";
import Messages from "../utils/messageManager.js";
import responseCodes from "../utils/responcecodes.js";
import userValidation from "../validation/userValidation.js";
import userServices from "../service/userServices.js";
export class userController {
  async getUser(req, res) {
    try {
      const { id } = req.params;
      // const { error } = await userValidation.getId.validate(req.params);
      // if (error) {
      //   return apiResponse.error(res, {
      //     status: responseCodes.BAD_REQUEST,
      //     message: error.details[0].message,
      //     data: {},
      //   });
      // }
      const isUserExist = await userServices.usereExist(id);
      if (!isUserExist) {
        return apiResponse.error(res, {
          status: responseCodes.BAD_REQUEST,
          message: Messages.USER.USER_NOT_EXIST,
        });
      }
      apiResponse.success(res, {
        status: responseCodes.SUCCESS,
        message: Messages.USER.USER_FOUND,
        data: isUserExist,
      });
    } catch (error) {
      return apiResponse.error(res, {
        status: responseCodes.SYSTEM_ERROR,
        message: Messages.USER.USER_NOT_EXIST,
        data: error,
      });
    }
  }
  async deleteUser(req,res){
    try{
    const{id}=req.params
    const isUserExist = await userServices.usereExist(id);
      if (!isUserExist) {
        return apiResponse.error(res, {
          status: responseCodes.BAD_REQUEST,
          message: Messages.USER.USER_NOT_EXIST,
        });
      }
      const deteleUser= await userServices.destroyUser(id)
      apiResponse.success(res, {
        status: responseCodes.SUCCESS,
        message: Messages.USER.USER_DELETE_SUCESSFULLY,
              });
    } catch (error) {
      return apiResponse.error(res, {
        status: responseCodes.SYSTEM_ERROR,
        message: Messages.USER.USER_DELETE_FAILED,
        data: error,
      });
    }}
   

  }
  

export default new userController();
