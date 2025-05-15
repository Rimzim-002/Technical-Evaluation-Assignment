
import Messages from "../utils/messageManager.js"
import  Course from "../models/courcesModel.js"
export  class courseServices{
    async findcourse(name){
    try {
      const isCourseExist = await Course.findOne({
        where: { name:name },
      });
      return isCourseExist;
    } catch (error) {
      throw new Error(error.message);
    }
    }

    async newCourse(attibutes) {
    const { name, duration, price } = attibutes;
    try {
      const createCourse = await Course.create({
        name: name,
        duration:duration,
        price:price
      });
      console.log(createCourse,"5678")
      return createCourse ;
    } catch (error) {
      throw new error();
    }
  }
    // async destroyUser(id){
    //      try{
    //         const deleteUser= await Student.update({isActive:false},{where:{id}})
    //         return deleteUser
    //      }catch(error){
    //       throw new error
    //      }
    // }
    
}

export  default new courseServices()