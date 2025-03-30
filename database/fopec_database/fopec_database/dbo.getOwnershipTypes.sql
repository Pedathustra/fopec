use fopec
go

if exists(select * from sys.procedures where name = 'getOwnershipTypes')
begin 
	drop proc getOwnershipTypes;
end 
go

create proc getOwnershipTypes 
as
begin
	set nocount on;
	select id, description from ownership_type;
end 
go 

exec getOwnershipTypes;