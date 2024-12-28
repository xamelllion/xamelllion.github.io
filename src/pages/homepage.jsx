import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faGithub,
	faVk,
	faTelegram
} from "@fortawesome/free-brands-svg-icons";
import { useSearchParams, useNavigate } from "react-router-dom";
import Footer from "../components/common/footer";
import Article from "../components/homepage/article";
import Works from "../components/homepage/works";
import AllProjects from "../components/projects/allProjects";
import CommentSection from "../components/Comments";

import INFO from "../data/user";
import myArticles from "../data/articles";

import "./styles/homepage.css";

const vkFunc = (setText, setShowExit) => {
	if ('VKIDSDK' in window) {
		const VKID = window.VKIDSDK;

		VKID.Config.init({
			app: 52877645,
			redirectUrl: 'https://xmllln.ru/',
			responseMode: VKID.ConfigResponseMode.Callback,
			source: VKID.ConfigSource.LOWCODE,
			scope: '',
		});

		const oneTap = new VKID.OneTap();

		oneTap.render({
			container: document.getElementById("vkAuth"),
			fastAuthEnabled: false,
			showAlternativeLogin: true
		})
		.on(VKID.WidgetEvents.ERROR, vkidOnError)
		.on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, function (payload) {
			const code = payload.code;
			const deviceId = payload.device_id;

			VKID.Auth.exchangeCode(code, deviceId)
			.then(vkidOnSuccess)
			.catch(vkidOnError);
		});
		
		function vkidOnSuccess(data) {
			console.log(data)
			VKID.Auth.userInfo(data.access_token)
			.then(data => {
				console.log(data)
				let user_obj = {
					status: 'ok',
					name: `${data.user.first_name} ${data.user.last_name}`,
					username: ''
				}
				localStorage.setItem('user', JSON.stringify(user_obj))
				setText(`Добрый день, ${user_obj.name}!`)
				setShowExit(true)
			})
		}

		function vkidOnError(error) {
			console.log(error)
		}
	}
}

const Homepage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
	const [showExit, setShowExit] = useState(false)

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const [text, setText] = useState('');

	useEffect(() => {
		vkFunc(setText, setShowExit)
		let user_data = localStorage.getItem('user')
		if (user_data !== null) {
			let info = JSON.parse(user_data)
			setText(`Добрый день, ${info.name}!`)
			setShowExit(true)
		}
	}, []);

	useEffect(() => {
		let code_param = searchParams.get("code")
		if (code_param !== null) {
			console.log(code_param)
			fetch(`https://site.xmllln.ru/github`, {
				method: 'POST',
				body: JSON.stringify({
					code: code_param
				}),
				headers: {
				  "Content-Type": "application/json",
				},
			  }).then(response =>response.json())
			  .then(data => {
				console.log(data)
				localStorage.setItem('user', JSON.stringify(data))
				setText(`Добрый день, ${data.name}!`)
				setShowExit(true)
			  })
		}
        navigate("/");
	}, []);

	const handleExit = () => {
		localStorage.removeItem('user')
		setShowExit(false)
		setText('')
	}

	return (
		<React.Fragment>
			<div className="page-content">
				<div className="content-wrapper">
					<div className="header">
						<div className="login_btns">
							<div style={{display: showExit === false ? 'block' : 'none' }} className="authDiv">
								<div className="login-container">
									<a href="https://github.com/login/oauth/authorize?scope=user:email&client_id=Ov23linoET1lxEihRl8w" className="github-login-button">
									<svg className="github-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
										<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.54 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.1 0 0 .67-.22 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.09.16 1.9.08 2.1.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.015 8.015 0 0016 8c0-4.42-3.58-8-8-8z"></path>
									</svg>
									Войти с GitHub
									</a>
								</div>
							</div>
							<div style={{display: showExit === false ? 'block' : 'none' }} className="authDiv" id="vkAuth"></div>
							<div style={{display: showExit ? 'block' : 'none' }} onClick={handleExit} className="exitDiv">
								<div className="login-container">
									<a href="#" className="github-login-button">
									Выход
									</a>
								</div>
							</div>
						</div>
						<div className="header_user_info">
							<p>{text}</p>
						</div>
					</div>
					
					<div className="homepage-logo-container">
						{/* <div style={logoStyle}>
							<Logo width={logoSize} link={false} />
						</div> */}
					</div>

					<div className="homepage-container">
						<div className="homepage-first-area">
							<div className="homepage-first-area-left-side">
								<div className="title homepage-title">
									{INFO.homepage.title}
								</div>

								<div className="subtitle homepage-subtitle about-me">
									<p>Матмех СПбГУ - Программная инженерия</p>
									<p>Интересы: компиляторы, криптография, хип хоп</p>
									<p>C++, LLVM project, Obfuscation, CMake, Docker, Python, React, Git</p>
								</div>
							</div>

							<div className="homepage-first-area-right-side">
								<div className="homepage-image-container">
									<div className="homepage-image-wrapper">
										<img
											src="main.PNG"
											alt="about"
											className="homepage-image"
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="homepage-socials">
							<a
								href={INFO.socials.github}
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faGithub}
									className="homepage-social-icon"
								/>
							</a>
							<a
								href={INFO.socials.vk}
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faVk}
									className="homepage-social-icon"
								/>
							</a>
							<a
								href={INFO.socials.tg}
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faTelegram}
									className="homepage-social-icon"
								/>
							</a>
						</div>

						<div className="homepage-projects">
							<AllProjects />
						</div>

						<div className="homepage-after-title">
							<div className="homepage-articles">
								<div className="homepage-articles-title">Образование</div>
								{myArticles.map((article, index) => (
									<div
										className="homepage-article"
										key={(index + 1).toString()}
									>
										<Article
											key={(index + 1).toString()}
											date={article().date}
											title={article().title}
											description={article().description}
											link={"/article/" + (index + 1)}
										/>
									</div>
								))}
							</div>

							<div className="homepage-works">
								<Works />
							</div>
						</div>
						<div className="">
							<CommentSection isAuthorized={showExit}/>
						</div>
						<div className="page-footer">
							<Footer />
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Homepage;
