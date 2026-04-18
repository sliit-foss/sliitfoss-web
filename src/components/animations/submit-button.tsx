"use client";

type Props = {
  loading: boolean;
};

export default function SubmitButton({ loading }: Props) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full px-8 py-4 rounded-xl text-sm font-semibold transition-all active:scale-95
      ${
        loading
          ? "bg-gray-700 cursor-not-allowed text-white"
          : "bg-[#111] text-white hover:shadow-lg"
      }`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Submitting...
        </span>
      ) : (
        "Submit Application"
      )}
    </button>
  );
}