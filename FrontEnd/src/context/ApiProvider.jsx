import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ApiContext } from './ApiContext'
import axios from 'axios'

const initialTextAreas = {
    sourceTextArea: 'hello, how are you?',
    targetTextArea: undefined
}

const ApiProvider = ({ children }) => {
    const [languages, setLanguages] = useState([])
    const [textAreas, setTextAreas] = useState(initialTextAreas)
    const [sourceLang, setSourceLang] = useState('EN')
    const [targetLang, setTargetLang] = useState('ES')
    const [sourceSelect, setSourceSelect] = useState('defaultSourceSelect')
    const [targetSelect, setTargetSelect] = useState('defaultTargetSelect')

    useEffect(() => {
        const getFirsTranslate = async () => {
            const text = {
                text: textAreas.sourceTextArea,
                source_lang: sourceLang,
                target_lang: targetLang
            }

            try {
                const {
                    data: {
                        translations: [translation]
                    }
                } = await axios.post('http://localhost:4000/translate', text)

                setSourceLang(translation.detected_source_language)

                setTextAreas({
                    ...textAreas,
                    targetTextArea: translation.text
                })
            } catch (error) {
                console.log(error)
            }
        }
        getFirsTranslate()
        getLanguages()
    }, [])

    const getTranslation = async () => {
        const text = {
            text: textAreas.sourceTextArea,
            source_lang: sourceLang,
            target_lang: targetLang
        }

        try {
            const {
                data: {
                    translations: [translation]
                }
            } = await axios.post('http://localhost:4000/translate', text)

            setSourceLang(translation.detected_source_language)

            setTextAreas({
                ...textAreas,
                targetTextArea: translation.text
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getLanguages = async () => {
        try {
            const response = await axios.get('http://localhost:4000/languages')
            setLanguages(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    console.log(sourceLang, 'SourceLang')
    console.log(targetLang, 'TargetLang')

    return (
        <ApiContext.Provider
            value={{
                getLanguages,
                getTranslation,
                languages,
                sourceLang,
                setSourceLang,
                targetLang,
                setTargetLang,
                textAreas,
                setTextAreas,
                sourceSelect,
                setSourceSelect,
                targetSelect,
                setTargetSelect
            }}
        >
            {children}
        </ApiContext.Provider>
    )
}

ApiProvider.propTypes = {
    children: PropTypes.node
}

export default ApiProvider
