import React, { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faGithub,
	faVk,
	faTelegram
} from "@fortawesome/free-brands-svg-icons";

import Footer from "../components/common/footer";
import Article from "../components/homepage/article";
import Works from "../components/homepage/works";
import AllProjects from "../components/projects/allProjects";

import INFO from "../data/user";
import myArticles from "../data/articles";

import "./styles/homepage.css";

const vkFunc = () => {
	if ('VKIDSDK' in window) {
		const VKID = window.VKIDSDK;

		VKID.Config.init({
			app: 52871599,
			redirectUrl: 'https://xamelllion.ru/',
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
			fetch(`https://c37e-2a0b-4140-da02-00-2.ngrok-free.app`, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
				  "Content-Type": "application/json",
				},
			  }).then(response => console.log(response))
		}
		
		function vkidOnError(error) {
			// Обработка ошибки
			console.log(error)
		}
	}
}

const Homepage = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		vkFunc()
	}, []);

	return (
		<React.Fragment>
			<div className="page-content">
				{/* <NavBar active="home" /> */}
				<div className="content-wrapper">
					<div className="authDiv" id="vkAuth"></div>
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
