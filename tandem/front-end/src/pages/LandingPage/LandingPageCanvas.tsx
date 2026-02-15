import { useEffect, useRef } from 'react';
import styles from './LandingPage.module.css';

interface ScreenCanvasProps {
  onClick: () => void;
}

export const ScreenCanvas = ({ onClick }: ScreenCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    function drawScreen() {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return;

      const currentCtx = currentCanvas.getContext('2d');
      if (!currentCtx) return;

      const w = currentCanvas.width;
      const h = currentCanvas.height;
      const centerY = h - 15;

      currentCtx.clearRect(0, 0, w, h);

      // Тень под ноутбуком
      currentCtx.shadowColor = 'rgba(81, 173, 255, 0.5)';
      currentCtx.shadowBlur = 30;
      currentCtx.shadowOffsetY = 15;

      // === ВЕРХНЯЯ ЧАСТЬ ===
      currentCtx.shadowBlur = 20;

      // Экран
      currentCtx.fillStyle = '#1c1c1e';
      currentCtx.beginPath();
      currentCtx.roundRect(w / 2 - 210, centerY - 160, 420, 170, 20);
      currentCtx.fill();

      // Рамка экрана
      currentCtx.strokeStyle = '#51ADFF';
      currentCtx.lineWidth = 1.5;
      currentCtx.beginPath();
      currentCtx.roundRect(w / 2 - 205, centerY - 155, 410, 160, 15);
      currentCtx.stroke();

      // Стеклянный эффект экрана
      const screenGradient = currentCtx.createLinearGradient(
        w / 2 - 200,
        centerY - 150,
        w / 2 + 200,
        centerY + 10
      );
      screenGradient.addColorStop(0, 'rgba(20, 30, 50, 0.95)');
      screenGradient.addColorStop(1, 'rgba(10, 15, 25, 0.98)');

      currentCtx.fillStyle = screenGradient;
      currentCtx.beginPath();
      currentCtx.roundRect(w / 2 - 200, centerY - 150, 400, 150, 10);
      currentCtx.fill();

      // Бегущий код на экране
      currentCtx.shadowBlur = 10;
      currentCtx.font = '13px "SF Mono", "Fira Code", monospace';

      const codeLines = [
        { text: 'function interviewPrep() {', color: '#51ADFF' },
        { text: '  const skills = ["TS", "React", "Node.js"];', color: '#FF8C20' },
        { text: '  const level = 42;', color: '#FF49DB' },
        { text: '  while(level < 99) {', color: '#13CE66' },
        { text: '    level = practice.master();', color: '#51ADFF' },
        { text: '  }', color: '#13CE66' },
        { text: '  return "HIRED!";', color: '#6B7280' },
        { text: '}', color: '#51ADFF' },
      ];

      // Анимация прокрутки
      const time = Date.now() / 1000;
      const offset = (time * 20) % 200;

      currentCtx.save();
      currentCtx.beginPath();
      currentCtx.roundRect(w / 2 - 190, centerY - 140, 380, 130, 8);
      currentCtx.clip();

      codeLines.forEach((line, index) => {
        currentCtx.fillStyle = line.color;
        currentCtx.fillText(line.text, w / 2 - 180, centerY - 100 + index * 20 - offset);
      });

      currentCtx.restore();

      animationFrameId = requestAnimationFrame(drawScreen);
    }

    drawScreen();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.laptopCanvas}
      width="600"
      height="190"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    />
  );
};
