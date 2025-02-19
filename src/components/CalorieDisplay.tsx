type CalorieDisplayProps = {
    calories: number,
    text: string
}

export default function CalorieDisplay({calories, text}: CalorieDisplayProps) {
  return (        
    <p className="text-white rounded-full grid grid-cols-1 gap-3 text-center mx-auto">
        <span className="font-black font-bold text-6xl max-sm:text-xl text-orange-400">{calories}</span> <span>{text}</span>
    </p>
  )
}
