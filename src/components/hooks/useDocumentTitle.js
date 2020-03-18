import React, { useEffect } from 'react';

function useDocumentTitle(title) {
    document.title = title;
}

export default useDocumentTitle;