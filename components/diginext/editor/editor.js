import { useRef, useState, useEffect } from "react";
import { UploadAdapter } from './service/uploadAdapter';

const Editor = (props) => {
    const editorRef = useRef();
    const [editorLoaded, setEditorLoaded] = useState(false);
    const { CKEditor } = editorRef.current || {};

    useEffect(function() {
        editorRef.current = {
            CKEditor: require('ckeditor4-react'),
        }
        setEditorLoaded(true);

    }, []);
    return (
        <React.Fragment>
            { editorLoaded ? (
                <CKEditor
                    ref={el => props.refRoot.current[props.refName] = el}
                    type="classic"
                    data={props.content.content}
                    config={{

                    }}
                    onInit={editor => {
                        editor.editing.view.change(writer => {
                            writer.setStyle("height", "300px", editor.editing.view.document.getRoot());
                        });
                    }}
                    onChange={(event, editor) => {

                    }}
                />
            ) : ''}
        </React.Fragment>
    );
};

export default Editor;