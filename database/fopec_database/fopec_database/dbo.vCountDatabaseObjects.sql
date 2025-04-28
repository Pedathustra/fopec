if exists(select * from sys.views where name = 'vCountDatabaseObjects')
begin 
	drop view vCountDatabaseObjects
end
go

create view vCountDatabaseObjects
as

	select	dbo.fnCountUserTables() table_count,	
			dbo.fnCountViews() view_count, 
			dbo.fnCountProcedures() procedure_count,
			dbo.fnCountFunctions() function_count,
			dbo.fnCountTriggers() trigger_count
		;

go

 