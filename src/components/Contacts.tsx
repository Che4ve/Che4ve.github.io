import '../styles/contacts.scss';
import {Modal} from "./Modal";
import {useEffect, useState} from "react";
import {ReactComponent as DownloadSvg} from '../assets/download.svg';
import {ReactComponent as MessageSvg} from '../assets/phone-call.svg';
import {ReactComponent as CopySvg} from '../assets/copy.svg';
import {CopyButton} from "./CopyButton";

const filePath = '../files/Резюме_Frontend_разработчик_Василий_Чесноков.pdf';

interface ContactDict {
    [key: string] : string;
};

export const Contacts = () => {

    const contactData : ContactDict = {
        ['phone'] : '89224031121',
        ['tg'] : '@Che4ve',
        ['email'] : 'chesnokov_vd@mail.ru'
    }

    const [modalVisible, setModalVisible] = useState(false);

    const handleOpenModal = () => {
        setModalVisible(true);
    }

    const handleCopyText = (key: string) => {
        navigator.clipboard.writeText(contactData[key]);
    }

    return (
        <>
            <div className={`contacts`}>
                <a className={'contacts__download-button'}
                   href={'../files/Резюме_Frontend_разработчик_Василий_Чесноков.pdf'}
                   download={'Резюме_Frontend_разработчик_Василий_Чесноков.pdf'}>
                    <DownloadSvg className="download-icon"/>
                    <p>Скачать</p>
                </a>
                <button className={'contacts__expand-button'}
                        onClick={(e) => {
                            handleOpenModal()
                        }}
                >
                    <MessageSvg className="message-icon"/>
                    <p>Контакты</p>
                </button>
            </div>
            {modalVisible &&
                <Modal id={'contacts__modal'} title={'Контакты'}
                       visible={modalVisible} setVisible={setModalVisible}>
                    <h3>Телефон:</h3>
                    <div>
                        <a>+7 (922) 403-11-21</a>
                        <CopyButton text={'89224031121'}/>
                    </div>
                    <h3>Почта:</h3>
                    <div>
                        <a>chesnokov_vd@mail.ru</a>
                        <CopyButton text={'chesnokov_vd@mail.ru'}/>
                    </div>
                    <h3>Telegram:</h3>
                    <div>
                        <a>@Che4ve</a>
                        <CopyButton text={'@Che4ve'}/>
                    </div>
                </Modal>
            }
        </>
    )
}