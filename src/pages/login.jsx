import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    }

	useEffect(() => {
		let code_param = searchParams.get("code")
		if (code_param !== null) {
			console.log(code_param)
            localStorage.setItem('code', code_param)
		}
        let client_id = 'Ov23linoET1lxEihRl8w'
        let client_secret = '2c9b9cc2bb54eb1f2ab9b48513558e0940373632'

        let url = `https://github.com/login/oauth/access_token`

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                client_id: client_id,
                client_secret: client_secret,
                code: code_param,
                accept: 'json'
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }).then(response =>response.json())
          .then(data => {
            console.log(data)
            // localStorage.setItem('userG', JSON.stringify(data))
          })


        // handleClick()
	}, []);

	return (
		<>
            <p>login</p>
        </>
	);
};

export default Login;
