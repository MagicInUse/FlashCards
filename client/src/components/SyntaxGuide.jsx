import React from 'react';

const SyntaxGuide = () => {
    return (
        <div className="syntax-guide">
            <h3>HTML Syntax Guide</h3>
            <table>
                <tbody>
                    <tr>
                        <td>Paragraph:</td>
                        <td>&lt;p&gt;text&lt;/p&gt;</td>
                        <td><p>Example</p></td>
                    </tr>
                    <tr>
                        <td>Superscript:</td>
                        <td>&lt;sup&gt;text&lt;/sup&gt;</td>
                        <td>x<sup>2</sup></td>
                    </tr>
                    <tr>
                        <td>Subscript:</td>
                        <td>&lt;sub&gt;text&lt;/sub&gt;</td>
                        <td>H<sub>2</sub>O</td>
                    </tr>
                    <tr>
                        <td>Greater than:</td>
                        <td>&amp;gt;</td>
                        <td>&gt;</td>
                    </tr>
                    <tr>
                        <td>Less than:</td>
                        <td>&amp;lt;</td>
                        <td>&lt;</td>
                    </tr>
                    <tr>
                        <td>Greater than or equal:</td>
                        <td>&amp;ge;</td>
                        <td>&ge;</td>
                    </tr>
                    <tr>
                        <td>Less than or equal:</td>
                        <td>&amp;le;</td>
                        <td>&le;</td>
                    </tr>
                    <tr>
                        <td>Ampersand:</td>
                        <td>&amp;amp;</td>
                        <td>&amp;</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SyntaxGuide;