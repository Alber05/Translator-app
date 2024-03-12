import SoundIcon from '../assets/sound_max_fill.svg'
import CopyIcon from '../assets/Copy.svg'
import ArrowsIcon from '../assets/Horizontal_top_left_main.svg'
import useTranslateContext from '../hooks/useTranslateContext'
import clsx from 'clsx'
import { toast } from 'sonner'

const TargetLanguage = () => {
    const {
        languages,
        setTextAreas,
        textAreas,
        sourceLang,
        setSourceLang,
        targetLang,
        setTargetLang,
        targetSelect,
        setTargetSelect
    } = useTranslateContext()

    const handleTargetLang = (e) => {
        setTargetLang(e.target.value)
    }

    const handleTargetSelect = async (e) => {
        setTargetSelect(e.target.value)
        setTargetLang(e.target.value)
    }

    const handleSwapLanguages = async () => {
        const tempLanguage = sourceLang
        await setSourceLang(targetLang)
        await setTargetLang(tempLanguage)

        const tempTextArea = textAreas.sourceTextArea
        setTextAreas({
            sourceTextArea: textAreas.targetTextArea,
            targetTextArea: tempTextArea
        })
    }

    const hadnleCopyTargetTextArea = () => {
        navigator.clipboard
            .writeText(textAreas.sourceTextArea)
            .then(() => {
                toast.success('Texto copiado al portapapeles')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className='mx-auto w-[95%] rounded-3xl border border-custom-CDD5E0 border-opacity-30 bg-custom-212936cc p-6 '>
            <div className='mb-4 flex flex-wrap justify-between gap-2 border-b border-b-custom-CDD5E0 border-opacity-30 pb-4 text-xs font-black text-custom-4D5562 lg:h-[51px]'>
                <div className='flex gap-2'>
                    <button
                        className={clsx(
                            'rounded-lg px-2 py-2  hover:bg-custom-4D5562 hover:text-custom-F9FAFB',
                            {
                                'bg-custom-4D5562 text-custom-F9FAFB':
                                    targetLang === 'EN'
                            }
                        )}
                        value='EN'
                        name='English'
                        onClick={(e) => handleTargetLang(e)}
                    >
                        English
                    </button>
                    <button
                        className={clsx(
                            'rounded-lg px-2 py-2  hover:bg-custom-4D5562 hover:text-custom-F9FAFB',
                            {
                                'bg-custom-4D5562 text-custom-F9FAFB':
                                    targetLang === 'ES'
                            }
                        )}
                        value='ES'
                        name='Spanish'
                        onClick={(e) => handleTargetLang(e)}
                    >
                        Spanish
                    </button>
                    <select
                        id='countries'
                        className={clsx(
                            'cursor-pointer rounded-lg px-2 py-2 hover:bg-custom-4D5562 hover:text-custom-F9FAFB',
                            {
                                'bg-custom-4D5562 text-custom-F9FAFB':
                                    targetLang != 'ES' &&
                                    targetLang != 'EN' &&
                                    targetLang != '',
                                'bg-transparent':
                                    targetLang == 'ES' ||
                                    targetLang == 'EN' ||
                                    targetLang == ''
                            }
                        )}
                        onChange={(e) => handleTargetSelect(e)}
                    >
                        <option
                            value='defaultTargetSelect'
                            selected
                            className='bg-custom-4D5562 text-custom-F9FAFB'
                        >
                            Select another language
                        </option>
                        {languages.map((currentLanguage) => {
                            if (
                                currentLanguage.language === 'EN' ||
                                currentLanguage.language === 'ES'
                            )
                                return

                            return (
                                <option
                                    name={currentLanguage.name}
                                    value={currentLanguage.language}
                                    key={currentLanguage.language}
                                    className='bg-custom-4D5562 text-custom-F9FAFB
                                       '
                                    selected={
                                        targetLang === currentLanguage.language
                                    }
                                >
                                    {currentLanguage.name}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <button
                        className='rounded-[0.65rem] border-2 border-custom-4D5562 p-1'
                        onClick={handleSwapLanguages}
                    >
                        <img
                            src={ArrowsIcon}
                            alt='Icono del botón para traducir el texto'
                        />
                    </button>
                </div>
            </div>

            <textarea
                name='translatedTextArea'
                id=''
                cols='30'
                rows='10'
                className='w-full resize-none bg-transparent text-sm font-semibold text-custom-F9FAFB outline-none lg:h-[232px]'
                value={textAreas.targetTextArea}
                disabled
            ></textarea>
            <div className='flex items-center justify-start gap-2 lg:h-[42px]'>
                <button className='rounded-[0.65rem] border-2 border-custom-4D5562 p-1'>
                    <img
                        src={SoundIcon}
                        alt='Icono del botón para escuchar el idioma traducido'
                    />
                </button>
                <button
                    className='rounded-[0.65rem] border-2 border-custom-4D5562 p-1'
                    onClick={hadnleCopyTargetTextArea}
                >
                    <img
                        src={CopyIcon}
                        alt='Icono del botón para copiar el texto traducido'
                    />
                </button>
            </div>
        </div>
    )
}

export default TargetLanguage
