import html2pdf from 'html2pdf.js';

export const generateResume = (skills = [], projects = [], certificates = []) => {
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill.name);
    return acc;
  }, {});

  // Build the HTML content
  const resumeHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Parth_Nerkar_Resume</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', Helvetica, sans-serif;
          color: #333;
          background: #fff;
          margin: 0;
          padding: 40px;
          line-height: 1.6;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
        }
        header {
          text-align: center;
          border-bottom: 2px solid #3b82f6;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        h1 {
          margin: 0;
          font-size: 36px;
          color: #1e3a8a;
          font-weight: 700;
        }
        .subtitle {
          margin: 10px 0 0;
          font-size: 18px;
          color: #4b5563;
        }
        section {
          margin-bottom: 30px;
          page-break-inside: avoid;
        }
        h2 {
          font-size: 24px;
          color: #1e3a8a;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 5px;
          margin-bottom: 15px;
        }
        .item-row {
          margin-bottom: 10px;
        }
        .project-item {
          margin-bottom: 20px;
          page-break-inside: avoid;
        }
        .project-title {
          margin: 0 0 5px;
          font-size: 18px;
          color: #1f2937;
          font-weight: 600;
        }
        .tech-stack {
          margin: 0 0 5px;
          font-size: 14px;
          color: #6b7280;
          font-style: italic;
        }
        .description {
          margin: 0;
          font-size: 15px;
          color: #4b5563;
        }
        ul {
          padding-left: 20px;
          margin: 0;
        }
        li {
          margin-bottom: 15px;
          page-break-inside: avoid;
        }
        .cert-title {
          font-size: 16px;
          color: #1f2937;
          font-weight: 600;
        }
        
        @media print {
          body { padding: 0; }
          .container { max-width: 100%; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <header>
          <h1>Parth Nerkar</h1>
          <p class="subtitle">AI & Data Science Student | Pune</p>
        </header>

        <section>
          <h2>Skills</h2>
          ${Object.entries(groupedSkills).map(([category, skillNames]) => `
            <div class="item-row">
              <strong>${category}:</strong> ${skillNames.join(', ')}
            </div>
          `).join('')}
        </section>

        <section>
          <h2>Projects</h2>
          ${projects.map(project => `
            <div class="project-item">
              <h3 class="project-title">${project.title}</h3>
              <p class="tech-stack">Tech Stack: ${project.techStack}</p>
              <p class="description">${project.description}</p>
            </div>
          `).join('')}
        </section>

        <section>
          <h2>Certificates</h2>
          <ul>
            ${certificates.map(cert => `
              <li>
                <span class="cert-title">${cert.title}</span> — ${cert.issuer}<br/>
                <span class="description">${cert.description}</span>
              </li>
            `).join('')}
          </ul>
        </section>
      </div>
      
      <script>
        // Automatically open print dialog when content is fully loaded
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 300);
        };
      </script>
    </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(resumeHtml);
    printWindow.document.close();
  } else {
    alert("Please allow popups to download the resume.");
  }
};
