#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🚀 DEPLOY CHECKLIST — KARLAN CLICKER → RENDER

Verifica tudo antes de fazer deploy no Render
"""

import os
import json
from pathlib import Path

class DeployChecker:
    def __init__(self, root_dir):
        self.root = Path(root_dir)
        self.checks = []
        
    def check_file_exists(self, filename, critical=True):
        path = self.root / filename
        exists = path.exists()
        status = "✅" if exists else ("🔴" if critical else "⚠️")
        size = f"({path.stat().st_size / 1024:.1f}KB)" if exists else ""
        print(f"{status} {filename:30} {size}")
        self.checks.append((filename, exists, critical))
        return exists
    
    def check_file_content(self, filename, required_strings):
        path = self.root / filename
        if not path.exists():
            print(f"🔴 {filename:30} (arquivo não existe)")
            return False
        
        content = path.read_text(encoding='utf-8')
        missing = []
        for req_str in required_strings:
            if req_str not in content:
                missing.append(req_str)
        
        if missing:
            print(f"⚠️  {filename:30} (faltam strings)")
            for m in missing:
                print(f"   └─ {m}")
            return False
        else:
            print(f"✅ {filename:30} (conteúdo validado)")
            return True
    
    def check_git_status(self):
        result = os.system("git status --porcelain > /dev/null 2>&1")
        if result == 0:
            print("✅ Git repository:              (ok)")
            return True
        else:
            print("🔴 Git repository:              (erro)")
            return False
    
    def run_all_checks(self):
        print("\n" + "="*70)
        print("🚀 DEPLOY CHECKLIST — KARLAN CLICKER")
        print("="*70 + "\n")
        
        # Arquivos críticos
        print("📁 ARQUIVOS CRÍTICOS")
        print("-" * 70)
        self.check_file_exists("index.html", critical=True)
        self.check_file_exists("script.js", critical=True)
        self.check_file_exists("styles.css", critical=True)
        self.check_file_exists("musica.mp3", critical=True)
        
        # Arquivos de deploy
        print("\n🔧 ARQUIVOS DE DEPLOY")
        print("-" * 70)
        self.check_file_exists("render.yaml", critical=True)
        self.check_file_exists(".gitignore", critical=True)
        self.check_file_exists("package.json", critical=True)
        self.check_file_exists("README.md", critical=True)
        self.check_file_exists(".nojekyll", critical=True)
        
        # Validação de conteúdo
        print("\n✓ VALIDAÇÃO DE CONTEÚDO")
        print("-" * 70)
        self.check_file_content("render.yaml", [
            "type: static_site",
            "staticPublishPath: .",
            "path: /",
            "destination: /index.html"
        ])
        
        self.check_file_content("index.html", [
            "<!DOCTYPE html>",
            'href="styles.css"',
            'src="script.js"',
            '<canvas id="hairCv"'
        ])
        
        self.check_file_content("script.js", [
            "function fireClick",
            "function compute",
            "function saveGame",
            "function doPrestige"
        ])
        
        self.check_file_content("README.md", [
            "KARLAN CLICKER",
            "https://karlan-clicker.onrender.com",
            "Deploy no Render"
        ])
        
        # Status do Git
        print("\n📊 GIT STATUS")
        print("-" * 70)
        self.check_git_status()
        
        # Relatório final
        print("\n" + "="*70)
        total = len(self.checks)
        passed = sum(1 for _, exists, _ in self.checks if exists)
        print(f"✅ PASSOU: {passed}/{total}")
        print("="*70 + "\n")
        
        # Instruções de deploy
        if passed == total:
            print("🚀 PRONTO PARA DEPLOY!\n")
            print("PASSOS:")
            print("1. git push origin main")
            print("2. Acessar: https://render.com")
            print("3. New > Static Site")
            print("4. Conectar repositório: Machado143/careca")
            print("5. Deploy automático ✅\n")
            print("RESULTADO:")
            print("📍 https://karlan-clicker.onrender.com\n")
        else:
            print("❌ ERROS ENCONTRADOS - NÃO FAÇA DEPLOY AINDA\n")
        
        return passed == total

if __name__ == "__main__":
    checker = DeployChecker(".")
    success = checker.run_all_checks()
    exit(0 if success else 1)
