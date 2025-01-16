import jwt from 'jsonwebtoken'

const auth = async(request,response,next)=>{
    try {
        /*
        request.cookies.accessToken for postman and website but when mobile side cookie not available then or section is used || request?.headers?.authorization?.split(" ")[1] 

        bearer token hence split  ["Bearer","token"]
        */
        const token = request.cookies.accessToken || request?.headers?.authorization?.split(" ")[1]
       
        if(!token){
            return response.status(401).json({
                message : "Provide token"
            })
        }

        const decode = await jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN)

        if(!decode){
            return response.status(401).json({
                message : "unauthorized access",
                error : true,
                success : false
            })
        }

        request.userId = decode.id
        console.log("decode user id ", decode)
        next()

    } catch (error) {
        return response.status(500).json({
            message : "You have not login",///error.message || error,
            error : true,
            success : false
        })
    }
}

export default auth