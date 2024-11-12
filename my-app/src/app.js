import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex
	const [activeIndex, setActiveIndex] = useState(0);

	// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
	let isFirstStep = true;
	let isLastStep = false;
	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
	function BackButtonClick() {
		setActiveIndex(activeIndex - 1);
		activeIndex === 0 ? (isFirstStep = true) : (isFirstStep = false);
	}
	function ForwardButtonClick() {
		setActiveIndex(activeIndex + 1);
		activeIndex === 6 ? (isLastStep = true) : (isLastStep = false);
	}
	function RestartButtonClick() {
		setActiveIndex(0);
		isFirstStep = true;
		isLastStep = false;
	}
	function setCurrentStepClick(e) {
		setActiveIndex(Number(e.currentTarget.id) - 1);
	}
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{data[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{data.map(({ id, title, content }) => (
							<li
								id={id}
								className={
									styles['steps-item'] +
									' ' +
									(Number(id) - 1 <= activeIndex && styles.done) +
									' ' +
									(Number(id) - 1 === activeIndex && styles.active)
								}
							>
								<button
									id={id}
									className={styles['steps-item-button']}
									onClick={setCurrentStepClick}
								>
									{String(Number(id))}
								</button>
								{title}
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={BackButtonClick}
							disabled={activeIndex === 0}
						>
							Назад
						</button>
						{activeIndex < 6 && (
							<button
								className={styles.button}
								onClick={ForwardButtonClick}
								disabled={activeIndex === 6}
							>
								Далее
							</button>
						)}
						{activeIndex === 6 && (
							<button
								className={styles.button}
								onClick={RestartButtonClick}
							>
								Начать сначала
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
