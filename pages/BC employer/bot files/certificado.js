
function gerarCertificado() {
    const nome = localStorage.getItem('nomeAluno') || 'Aluno';
    const nota = localStorage.getItem('quiz_pontuacao') || '0';

    const doc = new jspdf.jsPDF();
    doc.setFontSize(20);
    doc.text("Kids Business School", 70, 30);
    doc.setFontSize(16);
    doc.text("Certificado de Participação", 60, 50);

    doc.setFontSize(12);
    doc.text(`Certificamos que ${nome}`, 20, 70);
    doc.text("participou no programa Kids Business School", 20, 80);
    doc.text(`com aproveitamento de ${nota}%.`, 20, 90);

    doc.text("Data: ____________", 20, 110);
    doc.text("Assinatura do Formador: ___________________", 20, 120);

    doc.save(`Certificado_${nome}.pdf`);
}
