import { useEffect } from "react";

type InfoModalProps = {
  title: string;
  text: string;
  onClose: () => void;
};

export default function InfoModal({ title, text, onClose }: InfoModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <section className="flex flex-col gap-5 bg-white rounded-[20px] relative  w-fit">
      <div className="bg-white p-5 rounded-xl shadow-md flex flex-col items-center gap-6">
        <h4 className="text-[20px] font-bold">{title}</h4>

        <p className="text-lg">{text}</p>

        <button
          className="w-[70px] rounded-lg p-1 bg-accent text-white flex items-center justify-center"
          onClick={onClose}
        >
          ОК
        </button>
      </div>
    </section>
  );
}
