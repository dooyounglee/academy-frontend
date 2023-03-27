import { SPRINGBOOT_URL } from "./Constant";

const submit = (apiInfo) => {
    let option = {
        // method: apiInfo.method,
        method: "POST",
        // headers: apiInfo.headers,
        headers: {
            "Content-Type": "application/json",
        },
        // mode: 'same-origin', // cors, no-cors, *cors, same-origin
        body: JSON.stringify(apiInfo.body),
    }

    // header 없이 보낼때
    if(!apiInfo.notJwt) option.headers["X-AUTH-TOKEN"] = sessionStorage.getItem("jwt")

    fetch(SPRINGBOOT_URL + apiInfo.url, option)
    .then((res) => res.json())
    .then((res) => {
        console.log("res", res)
        if (!res.success) throw res
        apiInfo.success(res.returnObject)
    })
    .catch((error) => {
        console.log("errer", error)
        if (error.msg === "인증이 실패하였습니다.") {
            console.log("jwt 인증 실패")
        }
        alert(error.message)
    })
}

export { submit };