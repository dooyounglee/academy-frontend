import { SPRINGBOOT_URL } from "./Constant";

const submit = (apiInfo) => {
    fetch(SPRINGBOOT_URL + apiInfo.url, {
        // method: apiInfo.method,
        method: "POST",
        // headers: apiInfo.headers,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(apiInfo.body),
    })
    .then((res) => res.json())
    .catch((error) => alert(error))
    .then((res) => apiInfo.success(res));
}

export { submit };