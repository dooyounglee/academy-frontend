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
    console.log(option.headers)

    fetch(SPRINGBOOT_URL + apiInfo.url, option)
    .then((res) => res.json())
    .then((res) => {
        console.log("res", res)
        if (res.code !== 0) throw res
        apiInfo.success(res)
    })
    .catch((error) => {
        console.log(error)
        // alert(error.message)
    })
}

export { submit };