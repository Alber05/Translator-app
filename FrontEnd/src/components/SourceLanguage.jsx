import SoundIcon from '../assets/sound_max_fill.svg'
import CopyIcon from '../assets/Copy.svg'
import TranslateIcon from '../assets/Sort_alfa.svg'
import useTranslateContext from '../hooks/useTranslateContext'
import clsx from 'clsx'
import { toast } from 'sonner'

const SourceLanguage = () => {
    const {
        languages,
        setTextAreas,
        textAreas,
        getTranslation,
        sourceLang,
        setSourceLang,
        setSourceSelect
    } = useTranslateContext()

    const handleSourceLang = (e) => {
        setSourceLang(e.target.value)
        setSourceSelect('defaultSourceSelect')
    }

    const handleSourceTextArea = (e) => {
        setTextAreas({
            ...textAreas,
            [e.target.name]: e.target.value
        })
    }

    const submitTranslate = async () => {
        getTranslation()
    }

    const handleSourceSelect = async (e) => {
        setSourceSelect(e.target.value)
        setSourceLang(e.target.value)
    }

    const hadnleCopySourceTextArea = () => {
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
            <div className='mb-4 flex flex-wrap justify-start gap-2 border-b border-b-custom-CDD5E0 border-opacity-30 pb-4 text-xs font-black text-custom-4D5562'>
                <button
                    className={clsx(
                        'rounded-lg px-2 py-2  hover:bg-custom-4D5562 hover:text-custom-F9FAFB',
                        {
                            'bg-custom-4D5562 text-custom-F9FAFB':
                                sourceLang === ''
                        }
                    )}
                    name='DetectedLanguage'
                    value=''
                    onClick={(e) => handleSourceLang(e)}
                >
                    Detect language
                </button>

                <button
                    className={clsx(
                        'rounded-lg px-2 py-2  hover:bg-custom-4D5562 hover:text-custom-F9FAFB',
                        {
                            'bg-custom-4D5562 text-custom-F9FAFB':
                                sourceLang === 'EN'
                        }
                    )}
                    value='EN'
                    name='English'
                    onClick={(e) => handleSourceLang(e)}
                >
                    English
                </button>

                <button
                    className={clsx(
                        'rounded-lg px-2 py-2  hover:bg-custom-4D5562 hover:text-custom-F9FAFB',
                        {
                            'bg-custom-4D5562 text-custom-F9FAFB':
                                sourceLang === 'ES'
                        }
                    )}
                    value='ES'
                    name='Spanish'
                    onClick={(e) => handleSourceLang(e)}
                >
                    Spanish
                </button>

                <select
                    id='countries'
                    className={clsx(
                        'cursor-pointer rounded-lg px-2 py-2 hover:bg-custom-4D5562 hover:text-custom-F9FAFB',
                        {
                            'bg-custom-4D5562 text-custom-F9FAFB':
                                sourceLang != 'ES' &&
                                sourceLang != 'EN' &&
                                sourceLang != '',
                            'bg-transparent':
                                sourceLang == 'ES' ||
                                sourceLang == 'EN' ||
                                sourceLang == ''
                        }
                    )}
                    onChange={(e) => handleSourceSelect(e)}
                >
                    <option
                        defaultValue='defaultSourceSelect'
                        className='bg-custom-4D5562 text-custom-F9FAFB'
                    >
                        Select another language
                    </option>
                    {languages.map((currentLanguage) => {
                        if (
                            currentLanguage.language === 'EN-GB' ||
                            currentLanguage.language === 'ES'
                        )
                            return

                        return (
                            <option
                                name={currentLanguage.name}
                                value={currentLanguage.language}
                                key={currentLanguage.language}
                                selected={
                                    sourceLang === currentLanguage.language
                                }
                                className='bg-custom-4D5562 text-custom-F9FAFB'
                            >
                                {currentLanguage.name}
                            </option>
                        )
                    })}
                </select>
            </div>

            <textarea
                name='sourceTextArea'
                id=''
                cols='30'
                rows='10'
                value={textAreas.sourceTextArea}
                className='w-full resize-none bg-transparent text-sm font-semibold text-custom-F9FAFB outline-none'
                onChange={(e) => handleSourceTextArea(e)}
            ></textarea>

            <p className='mb-4 block text-right text-xs font-bold text-custom-4D5562'>
                {textAreas?.sourceTextArea.length}/500
            </p>

            <div className='flex items-center justify-between'>
                <div className='flex gap-2'>
                    <button className='rounded-[0.65rem] border-2 border-custom-4D5562 p-1'>
                        <img
                            src={SoundIcon}
                            alt='Icono del botón para esuchar el idioma a traducir'
                        />
                    </button>
                    <button
                        className='rounded-[0.65rem] border-2 border-custom-4D5562 p-1'
                        onClick={hadnleCopySourceTextArea}
                    >
                        <img
                            src={CopyIcon}
                            alt='Icono del botón para copiar el texto a traducir al portapapeles'
                        />
                    </button>
                </div>

                <button
                    className='flex rounded-xl border border-custom-7CA9F3 bg-custom-3662E3 px-4 py-2 font-semibold text-custom-CDD5E0'
                    onClick={submitTranslate}
                >
                    <img
                        src={TranslateIcon}
                        alt='Icono del botón para enviar la traducción'
                    />
                    <span>Translate</span>
                </button>
            </div>
        </div>
    )
}

export default SourceLanguage
