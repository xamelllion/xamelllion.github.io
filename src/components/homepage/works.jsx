import React from "react";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

import Card from "../common/card";

import "./styles/works.css";

const Works = () => {
	return (
		<div className="works">
			<Card
				icon={faBriefcase}
				title="Работа"
				body={
					<div className="works-body">
						<div className="work">
							<img
								src="./letter-c.jpg"
								alt="facebook"
								className="work-image"
							/>
							<div className="work-title">Софтком</div>
							<div className="work-subtitle">
								C++ разработчик
							</div>
							<div className="work-duration">2024 - настоящее время</div>
						</div>
						{/* <div className="work-desc">
							Обфускация, clang frontend/backend, 
						</div> */}
					</div>
				}
			/>
		</div>
	);
};

export default Works;
