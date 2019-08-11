import React from 'react'

const useLayout = (Layout, layoutProps = {}) => (Com, comProps = {}) => props => {
    let layoutModel = {};
    return (
        <Layout {...layoutProps} model={layoutModel} >
            <Com {...comProps} {...props} layout={layoutModel} />
        </Layout>
    )
}

export default useLayout