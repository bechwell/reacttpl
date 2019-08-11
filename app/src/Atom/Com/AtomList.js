import React, { useState } from 'react'
import AtomCom from "./";
import Loading from '../../Com/Loading';

function AtomList(props) {
    let { value, onChange } = props;
    let list = value || [];
    const onChanged = (callback) => {
        if (onChange) return onChange({ validate: false, callback });
        if (callback) callback();
    }
    const onSave = (callback) => {
        if (onChange) return onChange({ validate: true, callback });
        if (callback) callback();
    }


    let [data, setData] = useState({ data: {} });
    data.set = (obj = {}) => {
        data = { ...data, ...obj }
        setData(data);
    }

    data.bind = name => {
        return {
            value: data[name] || "",
            onChange: e => {
                data[name] = e.target.value || "";
                data.set({ data: {} });
            }
        }
    }

    data.data.bind = name => {
        return {
            value: data.data[name] || "",
            onChange: e => {
                data.data[name] = e.target.value || "";
                data.set({});
            }
        }
    }

    list.map((item, index) => {
        item.data = item.data || {};
        item.data.bind = name => {
            return {
                value: item.data[name] || "",
                onChange: e => {
                    item.data[name] = e.target.value || "";
                    onChanged()
                }
            }
        }
        item.move = function (old_index, new_index) {
            if (new_index >= list.length) {
                var k = new_index - list.length;
                while ((k--) + 1) {
                    list.push(undefined);
                }
            }
            list.splice(new_index, 0, list.splice(old_index, 1)[0]);
            onChanged()
            return list;
        }
            ;
        item.move_up = function () {
            if (index > 0) {
                return item.move(index, index - 1);
            }
            return item;
        }
            ;
        item.move_down = function () {
            if (index < list.length - 1) {
                return item.move(index, index + 1);
            }
            return item;
        }
        item.delete = () => {
            list.splice(index, 1)
            onChanged()
        }
        item.copy = () => {
            navigator.permissions.query({ name: "clipboard-write" }).then(result => {
                if (result.state == "granted" || result.state == "prompt") {
                    navigator.clipboard.writeText(window.btoa(JSON.stringify(item)))
                }
            });
        }
        item.past = (next = true) => {
            navigator.permissions.query({ name: "clipboard-read" }).then(result => {
                if (result.state == "granted" || result.state == "prompt") {
                    navigator.clipboard.readText().then(txt => {
                        if (!txt) return;
                        let elm = JSON.parse(window.atob(txt));
                        if (elm) {
                            if (next) {
                                list.splice(index + 1, 0, elm);
                            } else {
                                list.splice(index, 0, elm);
                            }
                            onChanged()
                        }
                    })
                }
            });
        }
    });

    let dialog = {};
    const onValidate = () => {
        if (AtomCom[data.comName]) {
            dialog.loading(true);
            list.push({
                type: data.comName,
                data: data.data
            });
            onChanged()
        } else {
            dialog.hide()
        }
    }

    let Coms = Object.entries(AtomCom)
        .map(([key, value]) => ({ key, value }))
        .filter(com => !!com.value);

    const Com = AtomCom[data.comName] || null;


    return (
        <div className="atom-list">
            <AtomDialog modal={dialog} onValidate={onValidate}>
                <select {...data.bind("comName")}>
                    <option>--</option>
                    {Coms.map((Com, i) => <option key={i} value={Com.key} >{Com.value.titre || Com.key}</option>)}
                </select>
                <hr />
                {Com && Com.Config ? (
                    <Com.Config data={data.data} />
                ) : null}
            </AtomDialog>
            <div className="atom-list-bottom">
                <button className="btn btn-sm btn-primary" onClick={e => dialog.show()}>Ajouter</button>
            </div>
            <div className="atom-list-content">
                {list.map((item, i) => (
                    <AtomItemContainer key={i} value={item} onChange={onChanged} onSave={onSave} >
                        <RenderAtomItem value={item} onChange={onChanged} />
                    </AtomItemContainer>
                ))}
            </div>
        </div>
    )
}


const AtomItemContainer = props => {
    const onChanged = (cb) => {
        if (props.onChange) return props.onChange(cb);
        if (cb) cb();
    }
    let [state, setState] = useState({});
    state.set = (obj = {}) => {
        state = { ...state, ...obj }
        setState(state);
    }
    let dialog = {};
    const Com = AtomCom[props.value.type] || null;
    const onSave = e => {
        dialog.loading(true);
        onChanged()
        if (props.onSave) props.onSave(() => dialog.hide())

    }
    return (
        <div className="atom-item-container">
            <AtomDialog modal={dialog} onValidate={onSave}>
                <Com.Config data={props.value.data} onChange={onChanged} />
            </AtomDialog>
            <div className="atom-item-menu">
                <button className="atom-item-menu-btn">Edit</button>
                <div className="atom-item-menu-list">
                    <button onClick={e => props.value.move_up()}>Up</button>
                    <button onClick={e => props.value.move_down()}>Down</button>
                    <button onClick={e => dialog.show()}>Edit</button>
                    <button onClick={e => props.value.delete()}>Delete</button>
                    <button onClick={e => props.value.copy()}>Copy</button>
                    <button onClick={e => props.value.past()}>Past</button>
                </div>
            </div>
            {props.children}
        </div>
    )
}

const RenderAtomItem = ({ value, onChange }) => {
    let item = value || {};
    if (AtomCom[item.type]) {
        const Com = AtomCom[item.type];
        if (Com.injectInProps) return <Com {...item.data} />;
        return <Com data={item.data} />
    }
    return <pre>{JSON.stringify(item, null, 2)}</pre>
}


const AtomDialog = props => {
    let [state, setState] = useState({ open: false });
    state.set = (obj = {}) => {
        state = { ...state, ...obj }
        setState(state);
    }

    if (props.modal) {
        props.modal.show = () => {
            state.set({ open: true, loading: false })
        }
        props.modal.hide = () => {
            state.set({ open: false, loading: false })
        }
        props.modal.loading = (v) => {
            state.set({ loading: !!v })
        }
    }

    if (!state.open) return null;

    return (
        <div className="atom-dialog">
            <div className="atom-dialog-content">
                {state.loading ? <Loading /> : null}
                <div className="atom-dialog-header">
                    <span style={{ flex: 1 }}>{props.titre}</span>
                    <button className="btnbtndialog" onClick={e => props.modal.hide()}>X</button>
                </div>
                <div className="atom-dialog-body">
                    {props.children}
                </div>
                <div className="atom-dialog-footer">
                    <span></span>
                    <div>
                        <button className="btn btn-primary" onClick={props.onValidate} >Valider</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default AtomList;