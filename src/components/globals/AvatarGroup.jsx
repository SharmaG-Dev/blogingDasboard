// components/AvatarGroup.jsx
const AvatarGroup = ({ members }) => {
    const visible = members.slice(0, 3)
    const extra = members.length - 3

    return (
        <div className='flex items-center space-x-[-8px]'>
            {visible.map((m, i) => (
                <img
                    key={i}
                    src={m.avatar}
                    alt={m.name}
                    className='w-8 h-8 rounded-full border-2 hover:scale-110 hover:-translate-y-1 hover:z-20 transition-all cursor-pointer border-white'
                />
            ))}
            {extra > 0 && (
                <div className='w-8 h-8 flex items-center justify-center bg-gray-200 text-sm text-gray-600 rounded-full border-2 border-white'>
                    +{extra}
                </div>
            )}
        </div>
    )
}

export default AvatarGroup
